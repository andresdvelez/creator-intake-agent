/** Strips markdown code fences and extracts the outermost JSON object from model output. */
export function extractJson(text: string): string {
  const trimmed = text.trim()

  // Strip markdown code fences (```json ... ``` or ``` ... ```)
  const fenced = /```(?:json)?\s*([\s\S]*?)\s*```/.exec(trimmed)
  if (fenced?.[1]) return fenced[1].trim()

  // Find the outermost JSON object by scanning backward from the last closing brace.
  // This handles models that emit thinking/preamble text before the JSON.
  const lastBrace = trimmed.lastIndexOf('}')
  if (lastBrace !== -1) {
    let depth = 0
    for (let i = lastBrace; i >= 0; i--) {
      const ch = trimmed[i]
      if (ch === '}') depth++
      else if (ch === '{') {
        depth--
        if (depth === 0) return trimmed.slice(i, lastBrace + 1)
      }
    }
  }

  return trimmed
}
