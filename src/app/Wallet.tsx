import { useAccount } from 'wagmi'
import { Card } from '@/components/ui/Card'
import { useAuthStore } from '@/stores/authStore'
import { useTokenBalances } from '@/hooks/useTokenBalances'
import { Skeleton } from '@/components/ui/Skeleton'
import { useEffect } from 'react'

export function WalletPage() {
  const { address } = useAccount()
  const user = useAuthStore((s) => s.user)
  const { data: balances, isLoading } = useTokenBalances()

  useEffect(() =>{
    console.log(balances, "ll");
    
  }, [balances])

  return (
    <div className="space-y-6">
      <h1 className="text-lg font-semibold">Wallet Overview</h1>

      <Card>
        <p className="text-xs text-text-muted">Connected Address</p>
        <p className="font-mono text-sm">{address}</p>
      </Card>

      <Card>
        <h3 className="text-sm font-medium text-text-muted mb-3">Token Balances</h3>
        {isLoading ? (
          <div className="space-y-2">
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-full" />
          </div>
        ) : balances && balances.length > 0 ? (
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-text-muted">
                <th className="py-1">Token</th>
                <th className="py-1 text-right">Balance</th>
              </tr>
            </thead>
            <tbody>
              {balances.map((b) => (
                <tr key={b.symbol} className="border-t border-border">
                  <td className="py-2">{b.symbol}</td>
                  <td className="py-2 text-right">{b.balance}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-xs text-text-muted">No token balances found.</p>
        )}
      </Card>

      <Card>
        <p className="text-xs text-text-muted mb-2">Risk Exposure</p>
        <p className="text-sm text-text-primary">No active risky approvals detected.</p>
      </Card>
    </div>
  )
}