import { useSimulation } from '@/hooks/useSimulation'
import { useAnalysisStore } from '@/stores/analysisStore'
import { Button } from '@/components/ui/Button'
import { Textarea } from '@/components/ui/Textarea'
import { SimulationCard } from '@/components/analysis/SimulationCard'
import { ExplanationCard } from '@/components/analysis/ExplanationCard'
import { Card } from '@/components/ui/Card'
import { useEffect } from 'react'

export function AnalyzePage() {
  const { currentPrompt, setPrompt, result, isSimulating, error } = useAnalysisStore()
  const simulation = useSimulation()

  const handleAnalyze = async () => {
    if (!currentPrompt) return
    useAnalysisStore.getState().startSimulation()
    try {
      const analysisResult = await simulation.mutateAsync(currentPrompt)
      
      useAnalysisStore.getState().finishSimulation(analysisResult)
    } catch (e: any) {
      useAnalysisStore.getState().setError(e.message || 'Analysis failed')
    }
  }

  useEffect(() => {
    console.log(result);
    
  }, [result]);

  return (
    <div className="max-w-3xl space-y-6">
      <h1 className="text-lg font-semibold">Transaction Analysis</h1>
      
      <div className="space-y-2">
        <label className="text-sm text-text-muted">Describe the transaction you want to analyze</label>
        <Textarea
          placeholder="e.g., Approve USDC spending limit on Uniswap router with unlimited amount"
          value={currentPrompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
        <Button onClick={handleAnalyze} disabled={isSimulating || !currentPrompt}>
          {isSimulating ? 'Analyzing...' : 'Analyze Transaction'}
        </Button>
      </div>

      {error && <p className="text-risk-high text-sm">{error}</p>}

      {result && (
        <div className="space-y-4">
          <SimulationCard simulation={result.simulation} />
          
          <Card>
            <h3 className="text-sm font-medium text-text-muted mb-1">Gas Estimate</h3>
            <p className="text-xl">{result.gasEstimate} gwei</p>
          </Card>

          <ExplanationCard riskLevel={result.riskLevel} explanation={result.aiSummary} />
        </div>
      )}
    </div>
  )
}