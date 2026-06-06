const GROQ_URL = 'https://api.groq.com/openai/v1/chat/completions'
const API_KEY = import.meta.env.VITE_GROQ_API_KEY

const headers = {
  Authorization: `Bearer ${API_KEY}`,
  'Content-Type': 'application/json',
}

// Preprocess the user prompt to extract explicit token + amount patterns
// e.g., "10usdt" → "10 USDT"
function preprocessPrompt(prompt: string): string {
  // Find patterns like "10usdt", "5.5eth", "0.1phrs"
  return prompt.replace(/(\d+(?:\.\d+)?)\s*([a-zA-Z]{2,6})\b/gi, '$1 $2')
}

function extractJsonOrFallback(text: string): any {
  try {
    const jsonMatch = text.match(/\{[\s\S]*\}/)
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0])
    }
  } catch {
    console.warn('Failed to parse JSON from AI response, using fallback')
  }
  return {
    to: '0x0000000000000000000000000000000000000000',
    value: '0',
    contractAddress: null,
    functionSignature: null,
    isUnlimitedApproval: false,
    token: null,
  }
}

export async function parseUserIntent(prompt: string): Promise<any> {
  // Clean the prompt so the AI sees a clear "10 USDT"
  const cleaned = preprocessPrompt(prompt)

  const res = await fetch(GROQ_URL, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      model: 'llama-3.1-8b-instant',
      messages: [
        {
          role: 'system',
          content:
            'You are a JSON API. You MUST output ONLY a valid JSON object, nothing else. The object must contain exactly these keys: to (string), value (string), contractAddress (string|null), functionSignature (string|null), isUnlimitedApproval (boolean), token (string|null - the ticker symbol like USDT, PHRS, ETH, etc. mentioned in the prompt, or null if not specified). No markdown, no backticks, no extra text.',
        },
        { role: 'user', content: cleaned },
      ],
      temperature: 0,
      response_format: { type: 'json_object' },
    }),
  })
  const data = await res.json()
  const content = data.choices[0].message.content
  return extractJsonOrFallback(content)
}

export async function generateExplanation(analysisData: any): Promise<string> {
  const token = analysisData?.intent?.token ?? null
  const enrichedData = { ...analysisData, token }

  const res = await fetch(GROQ_URL, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      model: 'llama-3.1-8b-instant',
      messages: [
        {
          role: 'system',
          content:
            'You are a blockchain security expert. Explain the following transaction in plain English, focusing on risks and what the user should check before signing. Be concise and professional. If a token ticker is provided, use it (e.g., "10 USDT") instead of generic terms like "cryptocurrency" or "units".',
        },
        { role: 'user', content: JSON.stringify(enrichedData) },
      ],
      temperature: 0.3,
    }),
  })
  const data = await res.json()
  return data.choices[0].message.content
}