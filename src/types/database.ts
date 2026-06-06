export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          wallet_address: string
          created_at: string
          last_login: string
        }
        Insert: {
          id: string
          wallet_address: string
          created_at?: string
          last_login?: string
        }
        Update: {
          id?: string
          wallet_address?: string
          created_at?: string
          last_login?: string
        }
      }
      analyses: {
        Row: {
          id: string
          user_id: string
          prompt: string
          risk_level: 'safe' | 'low' | 'medium' | 'high' | 'critical'
          ai_summary: string | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          prompt: string
          risk_level: 'safe' | 'low' | 'medium' | 'high' | 'critical'
          ai_summary?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          prompt?: string
          risk_level?: 'safe' | 'low' | 'medium' | 'high' | 'critical'
          ai_summary?: string | null
          created_at?: string
        }
      }
      simulations: {
        Row: {
          id: string
          analysis_id: string
          gas_estimate: number | null
          result: Json
          created_at: string
        }
        Insert: {
          id?: string
          analysis_id: string
          gas_estimate?: number | null
          result: Json
          created_at?: string
        }
        Update: {
          id?: string
          analysis_id?: string
          gas_estimate?: number | null
          result?: Json
          created_at?: string
        }
      }
      contracts: {
        Row: {
          id: string
          contract_address: string
          risk_score: number
          analysis: Json
          created_at: string
        }
        Insert: {
          id?: string
          contract_address: string
          risk_score: number
          analysis: Json
          created_at?: string
        }
        Update: {
          id?: string
          contract_address?: string
          risk_score?: number
          analysis?: Json
          created_at?: string
        }
      }
    }
  }
}