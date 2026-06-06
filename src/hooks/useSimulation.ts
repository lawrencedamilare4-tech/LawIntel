import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useAuthStore } from '@/stores/authStore'
import { parseUserIntent, generateExplanation } from '@/lib/deepseek'
import { simulateTransaction } from '@/lib/pharos'
import { computeRiskLevel } from '@/lib/risk-engine'
import { supabase } from '@/lib/supabase'
import type { AnalysisResult } from '@/types/analysis'
import { usePublicClient, useAccount } from 'wagmi'
import { parseEther } from 'viem'

export function useSimulation() {
  const user = useAuthStore((s) => s.user)
  const queryClient = useQueryClient()
  const publicClient = usePublicClient()        // connected chain’s public client
  const { address: connectedAddress } = useAccount()

  return useMutation({
    mutationFn: async (prompt: string): Promise<AnalysisResult> => {
      const intent = await parseUserIntent(prompt)

      // --- Balance check (if we know the account) ---
      let balanceCheck: { sufficient: boolean; message?: string } = { sufficient: true }

      if (connectedAddress && publicClient) {
        try {
          const balance = await publicClient.getBalance({ address: connectedAddress })
          const required = parseEther(intent.value || '0')

          if (balance < required) {
            balanceCheck = {
              sufficient: false,
              message: `Insufficient balance. You have ${(balance / 10n ** 18n).toString()} ETH, but the transaction requires ${intent.value} ETH.`,
            }
          }
        } catch (balanceError) {
          // If balance check fails, just continue – simulation will still run
          console.warn('Balance check failed:', balanceError)
        }
      }

      // If balance is insufficient, skip on-chain simulation and return directly
      if (!balanceCheck.sufficient) {
        const riskLevel = 'critical' as const
        const explanation = await generateExplanation({
          intent,
          simulation: { error: balanceCheck.message },
          riskLevel,
        })

        const { data: analysisData } = await supabase
          .from('analyses')
          .insert({
            wallet_address: user!.wallet_address,
            prompt,
            risk_level: riskLevel,
            ai_summary: explanation,
          })
          .select()
          .single()

        if (!analysisData) throw new Error('Failed to save analysis')

        return {
          analysisId: analysisData.id,
          riskLevel,
          aiSummary: explanation,
          simulation: { success: false, error: balanceCheck.message },
          gasEstimate: 'N/A',
        }
      }

      // --- Sufficient balance (or balance check skipped) -> try simulation ---
      const txParams = {
        from: user!.wallet_address as `0x${string}`,
        to: intent.to as `0x${string}`,
        value: intent.value ? parseEther(intent.value) : undefined,
        data: intent.functionSignature ? (`0x${intent.functionSignature}` as `0x${string}`) : undefined,
      }

      const simulation = await simulateTransaction(txParams)
      const riskLevel = computeRiskLevel(simulation, intent)
      const explanation = await generateExplanation({ intent, simulation, riskLevel })

      const { data: analysisData } = await supabase
        .from('analyses')
        .insert({
          wallet_address: user!.wallet_address,
          prompt,
          risk_level: riskLevel,
          ai_summary: explanation,
        })
        .select()
        .single()

      if (!analysisData) throw new Error('Failed to save analysis')

      await supabase.from('simulations').insert({
        analysis_id: analysisData.id,
        gas_estimate: simulation.gasEstimate ? parseFloat(simulation.gasEstimate) : null,
        result: simulation,
      })

      return {
        analysisId: analysisData.id,
        riskLevel,
        aiSummary: explanation,
        simulation,
        gasEstimate: simulation.gasEstimate || 'N/A',
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['analyses'] })
    },
  })
}