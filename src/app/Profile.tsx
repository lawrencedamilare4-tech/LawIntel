import { useAuthStore } from '@/stores/authStore'
import { Card } from '@/components/ui/Card'
import { useAnalyses } from '@/hooks/useAnalyses'

export function ProfilePage() {
  const user = useAuthStore((s) => s.user)
  const { data: analyses } = useAnalyses()

  return (
    <div className="space-y-6">
      <h1 className="text-lg font-semibold">Profile</h1>
      <Card>
        <p className="text-xs text-text-muted">Wallet Address</p>
        <p className="font-mono text-sm">{user?.wallet_address}</p>
        <p className="text-xs text-text-muted mt-3">Total Analyses</p>
        <p className="text-xl">{analyses?.length ?? 0}</p>
        <p className="text-xs text-text-muted mt-3">Today Date</p>
        <p className="text-sm">{user?.created_at ? new Date(user.created_at).toLocaleDateString() : '-'}</p>
      </Card>
    </div>
  )
}