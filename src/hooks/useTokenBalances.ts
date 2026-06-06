import { useQuery } from '@tanstack/react-query'
import { useAccount } from 'wagmi'
import { publicClient } from '@/lib/pharos'   // we need to export it from pharos.ts
import { KNOWN_TOKENS, type TokenInfo } from '@/lib/tokens'

async function fetchTokenBalance(
  token: TokenInfo,
  walletAddress: `0x${string}`
): Promise<{ symbol: string; balance: string }> {
  if (token.symbol === 'PHRS') {
    // native balance
    const bal = await publicClient!.getBalance({ address: walletAddress })
    return { symbol: token.symbol, balance: (Number(bal) / 1e18).toFixed(4) }
  }
  // ERC‑20
  const data = await publicClient!.readContract({
    address: token.address,
    abi: ['function balanceOf(address) view returns (uint256)'],
    functionName: 'balanceOf',
    args: [walletAddress],
  })
  const balance = Number(data) / 10 ** token.decimals
  return { symbol: token.symbol, balance: balance.toFixed(token.decimals) }
}

export function useTokenBalances() {
  const { address } = useAccount()

  return useQuery({
    queryKey: ['tokenBalances', address],
    queryFn: async () => {
      if (!address || !publicClient) return []

      console.log(address);
      
      const results = await Promise.all(
        KNOWN_TOKENS.map((token) => fetchTokenBalance(token, address))
      )
          console.log(results, "\g");
      return results

  
    },
    enabled: !!address && !!publicClient,
  })
}