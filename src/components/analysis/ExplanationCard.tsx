import { Card } from '@/components/ui/Card'
import { RiskBadge } from '@/components/ui/Badge'

// Strip markdown artifacts
function cleanText(text: string): string {
  return text
    .replace(/\*\*(.*?)\*\*/g, '$1')
    .replace(/\*(.*?)\*/g, '$1')
    .replace(/###? /g, '')
}

// Insert line breaks before numbered list items
function formatListItems(text: string): string {
  return text.replace(/(^|[^\n])(\d+\.)\s/g, '$1\n$2 ')
}

// Split into sections by headings like "Risks:", "Before Signing:", etc.
function parseSections(raw: string): { heading: string; body: string }[] {
  const text = cleanText(raw)
  // Split at a heading line (starts with capital, ends with colon, short)
  const blocks = text.split(/\n(?=[A-Z][^:]{0,30}:\n)/)
  const sections: { heading: string; body: string }[] = []
  const seen = new Set<string>()

  for (const block of blocks) {
    const trimmed = block.trim()
    if (!trimmed) continue

    const headingMatch = trimmed.match(/^([A-Z][^:]{0,30}):\n?/)
    if (!headingMatch) {
      // No heading – append to previous body or create untitled section
      if (sections.length > 0) {
        sections[sections.length - 1].body += '\n' + trimmed
      } else {
        sections.push({ heading: '', body: trimmed })
      }
      continue
    }

    const heading = headingMatch[1]
    const body = trimmed.slice(headingMatch[0].length).trim()

    // Generate a unique key to detect duplicates (heading + body content)
    const key = `${heading.toLowerCase()}|${body}`
    if (seen.has(key)) continue  // skip exact duplicate
    seen.add(key)

    sections.push({ heading, body })
  }

  return sections
}

export function ExplanationCard({
  riskLevel,
  explanation,
}: {
  riskLevel: string
  explanation: string
}) {
  const sections = parseSections(explanation)

  return (
    <Card>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-text-muted">AI Risk Assessment</h3>
        <RiskBadge level={riskLevel as any} />
      </div>

      <div className="space-y-4 text-sm leading-relaxed">
        {sections.map((section, i) => (
          <div key={i}>
            {section.heading && (
              <h4 className="text-xs font-semibold text-text-primary mb-1 tracking-wide uppercase">
                {section.heading}
              </h4>
            )}
            <p className="text-text-muted whitespace-pre-line">
              {formatListItems(section.body)}
            </p>
          </div>
        ))}
      </div>
    </Card>
  )
}