import { Card } from '@/components/ui/Card'
import { useAnalyses } from '@/hooks/useAnalyses'
import { useAuthStore } from '@/stores/authStore'
import { Activity, Shield, Wallet, Clock } from 'lucide-react'

export function Dashboard() {
  const user = useAuthStore((s) => s.user)
  const { data: analyses } = useAnalyses()

  const stats = {
    total: analyses?.length ?? 0,
    risksDetected: analyses?.filter(a => a.risk_level !== 'safe').length ?? 0,
    walletsConnected: 1, // static, could be real
    avgTime: '2.3s',
  }

  return (
    <div className="space-y-6">
      <h1 className="text-lg font-semibold">Dashboard</h1>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <div className="flex items-center gap-3">
            <Activity className="w-5 h-5 text-text-muted" />
            <div>
              <p className="text-xs text-text-muted">Total Analyses</p>
              <p className="text-xl font-semibold text-text-primary">{stats.total}</p>
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex items-center gap-3">
            <Wallet className="w-5 h-5 text-text-muted" />
            <div>
              <p className="text-xs text-text-muted">Wallets Connected</p>
              <p className="text-xl font-semibold text-text-primary">{stats.walletsConnected}</p>
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex items-center gap-3">
            <Shield className="w-5 h-5 text-text-muted" />
            <div>
              <p className="text-xs text-text-muted">Risks Detected</p>
              <p className="text-xl font-semibold text-text-primary">{stats.risksDetected}</p>
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex items-center gap-3">
            <Clock className="w-5 h-5 text-text-muted" />
            <div>
              <p className="text-xs text-text-muted">Avg Simulation Time</p>
              <p className="text-xl font-semibold text-text-primary">{stats.avgTime}</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}