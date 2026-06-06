import { useState } from 'react'
import { useContractAnalysis } from '@/hooks/usePharos'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { RiskBadge } from '@/components/ui/Badge'
import { Shield, Activity, FileCode, ExternalLink } from 'lucide-react'

const PHAROS_EXPLORER = 'https://atlantic.pharosscan.xyz/address'

function riskLevelFromScore(score: number): 'safe' | 'low' | 'medium' | 'high' | 'critical' {
  if (score >= 80) return 'critical'
  if (score >= 60) return 'high'
  if (score >= 40) return 'medium'
  if (score >= 20) return 'low'
  return 'safe'
}

export function ContractPage() {
  const [address, setAddress] = useState('')
  const [search, setSearch] = useState('')

  const { data, isLoading, error, isSuccess } = useContractAnalysis(
    search.startsWith('0x') ? (search as `0x${string}`) : undefined
  )

  const handleSearch = () => {
    const trimmed = address.trim()
    if (trimmed) setSearch(trimmed)
  }

  return (
    <div className="w-full max-w-full lg:max-w-3xl space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold">Contract Analyzer</h1>
        <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-wide text-accent-blue border border-accent-blue/30 px-2.5 py-1">
          <Shield className="w-3 h-3" />
          Pharos Atlantic Testnet
        </div>
      </div>

      <div className="flex gap-2">
        <Input
          placeholder="Paste contract address (0x...)"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
        />
        <Button onClick={handleSearch} disabled={!address || isLoading}>
          {isLoading ? 'Scanning...' : 'Analyze'}
        </Button>
      </div>

      {error && (
        <p className="text-risk-high text-sm">Failed to load contract data. The address may be invalid or the network is unreachable.</p>
      )}

      {isLoading && (
        <div className="space-y-3">
          <div className="h-6 w-48 bg-surface-raised animate-pulse rounded" />
          <div className="h-4 w-72 bg-surface-raised animate-pulse rounded" />
          <div className="h-20 bg-surface-raised animate-pulse rounded" />
        </div>
      )}

      {isSuccess && data && (
        <div className="space-y-4">
          <Card>
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-sm font-medium text-text-muted mb-1">Contract Address</h3>
                <p className="font-mono text-sm text-text-primary break-all">{search}</p>
                <a
                  href={`${PHAROS_EXPLORER}/${search}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 mt-1 text-xs text-accent-blue hover:underline"
                >
                  View on Pharosscan <ExternalLink className="w-3 h-3" />
                </a>
              </div>
              <RiskBadge level={riskLevelFromScore(data.riskScore)} />
            </div>
          </Card>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Card>
              <div className="flex items-center gap-3">
                <Shield className="w-4 h-4 text-accent-blue" />
                <div>
                  <p className="text-xs text-text-muted">Risk Score</p>
                  <p className="text-xl font-semibold">{data.riskScore}/100</p>
                </div>
              </div>
            </Card>

            <Card>
              <div className="flex items-center gap-3">
                <Activity className="w-4 h-4 text-accent-emerald" />
                <div>
                  <p className="text-xs text-text-muted">Verification</p>
                  <p className={`text-sm font-medium ${data.verified ? 'text-risk-safe' : 'text-risk-high'}`}>
                    {data.verified ? 'Verified' : 'Unverified'}
                  </p>
                </div>
              </div>
            </Card>

            <Card>
              <div className="flex items-center gap-3">
                <FileCode className="w-4 h-4 text-text-muted" />
                <div>
                  <p className="text-xs text-text-muted">Bytecode</p>
                  <p className="text-sm font-medium">{data.bytecodeSize ? `${(data.bytecodeSize / 1024).toFixed(1)} KB` : 'Empty'}</p>
                </div>
              </div>
            </Card>
          </div>

          {data.warnings && data.warnings.length > 0 && (
            <Card>
              <h3 className="text-sm font-medium text-text-muted mb-3">Warnings</h3>
              <div className="space-y-2">
                {data.warnings.map((w: string, i: number) => (
                  <div key={i} className="flex items-start gap-2 text-xs text-risk-high">
                    <span className="mt-0.5">•</span>
                    <p>{w}</p>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {data.rawAnalysis && (
            <Card>
              <h3 className="text-sm font-medium text-text-muted mb-2">Raw Analysis Data</h3>
              <pre className="text-xs font-mono text-text-muted overflow-auto max-h-48 bg-surface p-3 border border-border">
                {JSON.stringify(data.rawAnalysis, null, 2)}
              </pre>
            </Card>
          )}
        </div>
      )}

      {isSuccess && !data && (
        <p className="text-text-muted text-sm">No data found for this address.</p>
      )}
    </div>
  )
}