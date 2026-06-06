import { useState } from 'react'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { publicClient } from '@/lib/pharos'

export function BatchBalancePage() {
  const [addresses, setAddresses] = useState('')
  const [results, setResults] = useState<{ address: string; balance: string }[] | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleCheck = async () => {
    setError('')
    const list = addresses
      .split(/[\n,]+/)
      .map((a) => a.trim())
      .filter(Boolean)

    if (list.length === 0) {
      setError('Enter at least one address')
      return
    }
    setLoading(true)
    try {
      const balances = await Promise.all(
        list.map(async (addr) => {
          const bal = await publicClient!.getBalance({ address: addr as `0x${string}` })
          return { address: addr, balance: (Number(bal) / 1e18).toFixed(4) }
        })
      )
      setResults(balances)
    } catch (e: any) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <h1 className="text-lg font-semibold">Batch Balance Checker</h1>
      <div className="space-y-2">
        <label className="text-sm text-text-muted">
          Paste addresses (one per line or comma‑separated)
        </label>
        <textarea
          className="h-32 w-full border border-border bg-surface px-4 py-3 text-sm text-text-primary placeholder:text-text-muted focus:border-accent-blue focus:outline-none resize-none"
          value={addresses}
          onChange={(e) => setAddresses(e.target.value)}
          placeholder="0x1234...
0x5678..."
        />
        <Button onClick={handleCheck} disabled={loading}>
          {loading ? 'Checking...' : 'Check Balances'}
        </Button>
        {error && <p className="text-risk-high text-sm">{error}</p>}
      </div>

      {results && (
        <Card>
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-text-muted">
                <th className="py-1">Address</th>
                <th className="py-1 text-right">Native Balance</th>
              </tr>
            </thead>
            <tbody>
              {results.map((r) => (
                <tr key={r.address} className="border-t border-border">
                  <td className="py-2 font-mono text-xs">{r.address}</td>
                  <td className="py-2 text-right">{r.balance} PHRS</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      )}
    </div>
  )
}