import { useQuery } from '@tanstack/react-query'
import { analyzeContract } from '@/lib/pharos'

export function useContractAnalysis(address: `0x${string}` | undefined) {
  return useQuery({
    queryKey: ['contract', address],
    queryFn: async () => {
      if (!address) return null
      const result = await analyzeContract(address)
      return {
        address,
        riskScore: result.riskScore,
        verified: result.verified,
        warnings: result.warnings || [],
        bytecodeSize: result.bytecodeSize,
        rawAnalysis: result,
      }
    },
    enabled: !!address,
  })
}