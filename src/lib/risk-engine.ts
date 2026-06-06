// lib/risk-engine.ts
import type { PharosSimulationResult } from '@/types'

export function computeRiskLevel(simulation: PharosSimulationResult, txDetails: any): 'safe'|'low'|'medium'|'high'|'critical' {
  if (simulation.error) return 'critical'
  if (txDetails.hasUnlimitedApproval) return 'high'
  if (!txDetails.contractVerified) return 'high'
  if (txDetails.value > 1000000) return 'medium'
  if (txDetails.balanceLow) return 'medium'
  if (simulation.gasEstimate > 1000000) return 'medium'
  return 'safe'
}