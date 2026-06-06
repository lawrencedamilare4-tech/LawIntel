export interface SimulationResult {
  success: boolean
  gasEstimate?: string
  logs?: any[]
  error?: string
}

export interface AnalysisResult {
  analysisId: string
  riskLevel: 'safe' | 'low' | 'medium' | 'high' | 'critical'
  aiSummary: string
  simulation: SimulationResult
  gasEstimate: string
}

export interface ParsedIntent {
  to: string
  value: string
  contractAddress?: string | null
  functionSignature?: string | null
  isUnlimitedApproval?: boolean
  token?: string | null            // <-- new
}