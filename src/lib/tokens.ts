// src/lib/tokens.ts
export interface TokenInfo {
  symbol: string
  address: `0x${string}`
  decimals: number
}

// Placeholder tokens on Pharos Atlantic Testnet – replace with actual contract addresses
export const KNOWN_TOKENS: TokenInfo[] = [
  { symbol: 'PHRS', address: '0x0000000000000000000000000000000000000000', decimals: 18 }, // native
  { symbol: 'USDT', address: '0xdAC17F958D2ee523a2206206994597C13D831ec7', decimals: 6 },   // placeholder
  { symbol: 'USDC', address: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48', decimals: 6 }, // placeholder
]

export function getTokenBySymbol(symbol: string): TokenInfo | undefined {
  return KNOWN_TOKENS.find(
    (t) => t.symbol.toLowerCase() === symbol.toLowerCase()
  )
}