import { Card } from '@/components/ui/Card'
import type { SimulationResult } from '@/types/analysis'

function truncateHex(hex: string, maxLen = 18) {
  if (!hex) return ''
  if (hex.length <= maxLen + 2) return hex
  return `${hex.slice(0, maxLen)}…${hex.slice(-4)}`
}

function LogItem({ log }: { log: any }) {
  return (
    <div className="border border-border bg-surface p-3 text-xs font-mono space-y-2">
      <div>
        <span className="text-text-muted">Address: </span>
        <span className="text-text-primary">{truncateHex(log.address)}</span>
      </div>

      {log.topics && log.topics.length > 0 && (
        <div>
          <p className="text-text-muted mb-1">Topics:</p>
          <ul className="list-disc list-inside space-y-1">
            {log.topics.map((topic: string, i: number) => (
              <li key={i} className="text-text-primary break-all">
                {truncateHex(topic, 26)}
              </li>
            ))}
          </ul>
        </div>
      )}

      {log.data && log.data !== '0x' && (
        <div>
          <p className="text-text-muted mb-1">Data:</p>
          <p className="break-all text-text-primary">{truncateHex(log.data, 40)}</p>
        </div>
      )}

      {log.eventName && (
        <div>
          <span className="text-text-muted">Event: </span>
          <span className="text-accent-emerald font-medium">{log.eventName}</span>
        </div>
      )}
    </div>
  )
}

export function SimulationCard({ simulation }: { simulation: SimulationResult }) {
  return (
    <Card>
      <h3 className="text-sm font-medium text-text-muted mb-3">Simulation Result</h3>

      {simulation.error ? (
        <p className="text-risk-high text-sm">{simulation.error}</p>
      ) : (
        <>
          <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
            <div>
              <span className="text-text-muted">Status</span>
              <p className={simulation.success ? 'text-risk-safe' : 'text-risk-high'}>
                {simulation.success ? 'Success' : 'Reverted'}
              </p>
            </div>
            <div>
              <span className="text-text-muted">Gas</span>
              <p>{simulation.gasEstimate ?? 'N/A'}</p>
            </div>
          </div>

          {simulation.logs && simulation.logs.length > 0 && (
            <div>
              <h4 className="text-xs font-medium text-text-muted mb-2">Transaction Logs</h4>
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {simulation.logs.map((log: any, i: number) => (
                  <LogItem key={i} log={log} />
                ))}
              </div>
            </div>
          )}

          {(!simulation.logs || simulation.logs.length === 0) && (
            <p className="text-xs text-text-muted">No events emitted</p>
          )}
        </>
      )}
    </Card>
  )
}