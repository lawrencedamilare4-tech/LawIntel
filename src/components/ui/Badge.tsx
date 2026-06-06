import { cn } from "@/lib/utils"

export function RiskBadge({ level }: { level: 'safe' | 'low' | 'medium' | 'high' | 'critical' }) {
  const colorMap = {
    safe: "text-risk-safe border-risk-safe",
    low: "text-risk-safe border-risk-safe",
    medium: "text-risk-medium border-risk-medium",
    high: "text-risk-high border-risk-high",
    critical: "text-risk-critical border-risk-critical",
  }
  return (
    <span className={cn("inline-block border px-2 py-0.5 text-xs font-medium", colorMap[level])}>
      {level.toUpperCase()}
    </span>
  )
}