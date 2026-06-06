import { useAnalyses } from '@/hooks/useAnalyses'
import { RiskBadge } from '@/components/ui/Badge'
import { Card } from '@/components/ui/Card'
import { Skeleton } from '@/components/ui/Skeleton'
import { useState } from 'react'
import { Input } from '@/components/ui/Input'

export function HistoryPage() {
  const { data: analyses, isLoading } = useAnalyses()
  const [search, setSearch] = useState('')

  const filtered = analyses?.filter(a =>
    a.prompt.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="space-y-6">
      <h1 className="text-lg font-semibold">Analysis History</h1>
      <Input
        placeholder="Search prompts..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      {isLoading ? (
        <div className="space-y-3">
          <Skeleton className="h-16 w-full" />
          <Skeleton className="h-16 w-full" />
          <Skeleton className="h-16 w-full" />
        </div>
      ) : filtered?.length === 0 ? (
        <p className="text-text-muted text-sm">No analyses yet.</p>
      ) : (
        <div className="space-y-3">
          {filtered?.map((a) => (
            <Card key={a.id}>
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium">{a.prompt}</p>
                  <p className="text-xs text-text-muted mt-1">
                    {new Date(a.created_at).toLocaleDateString()}
                  </p>
                </div>
                <RiskBadge level={a.risk_level} />
              </div>
              {a.ai_summary && (
                <p className="text-xs text-text-muted mt-2 line-clamp-2">{a.ai_summary}</p>
              )}
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}