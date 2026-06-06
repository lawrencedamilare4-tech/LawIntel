import { create } from 'zustand'
import type { AnalysisResult } from '@/types/analysis'

interface AnalysisState {
  currentPrompt: string
  result: AnalysisResult | null
  isSimulating: boolean
  error: string | null
  setPrompt: (prompt: string) => void
  runAnalysis: (result: AnalysisResult) => void
  startSimulation: () => void
  finishSimulation: (result: AnalysisResult) => void
  setError: (error: string) => void
  reset: () => void
}

export const useAnalysisStore = create<AnalysisState>((set) => ({
  currentPrompt: '',
  result: null,
  isSimulating: false,
  error: null,
  setPrompt: (prompt) => set({ currentPrompt: prompt, error: null }),
  runAnalysis: (result) => set({ result, isSimulating: false, error: null }),
  startSimulation: () => set({ isSimulating: true, error: null, result: null }),
  finishSimulation: (result) => set({ result, isSimulating: false }),
  setError: (error) => set({ error, isSimulating: false }),
  reset: () => set({ currentPrompt: '', result: null, isSimulating: false, error: null }),
}))