# Creator Intake Review Agent

An internal tool for campaign managers to review creator applications, run AI-powered fit analysis, and make decisions — all in a single focused workspace.

## Setup

**Prerequisites:** [Bun](https://bun.sh) and an [Anthropic API key](https://console.anthropic.com).

```bash
# 1. Install dependencies
bun install

# 2. Create your local env file
cp .env.example .env.local
# Edit .env.local and add your ANTHROPIC_API_KEY

# 3. Start the dev server
bun run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment Variables

| Variable | Required | Description |
|---|---|---|
| `AI_PROVIDER` | No | `anthropic` (default) or `gemini` |
| `ANTHROPIC_API_KEY` | When provider is `anthropic` | Get at [console.anthropic.com](https://console.anthropic.com) — model: `claude-haiku-4-5-20251001` |
| `GEMINI_API_KEY` | When provider is `gemini` | Get at [aistudio.google.com](https://aistudio.google.com) — model: `gemini-2.5-flash` (free tier available) |

To use Gemini instead of Anthropic, set in `.env.local`:
```
AI_PROVIDER=gemini
GEMINI_API_KEY=your_key_here
```

## Commands

```bash
bun run dev         # Start dev server (Turbopack)
bun run build       # Production build
bun run typecheck   # TypeScript type check
bun run lint        # ESLint
bun test            # Run test suite (122 tests)
```

---

## AI Agent Design

The review is triggered by a **Next.js Server Action** (`src/lib/actions/review.ts`). The API key lives exclusively server-side — it is never shipped to the browser.

**Flow:**
1. The client calls `runCreatorReview(creatorId)` — a `'use server'` function validated with Zod.
2. The action looks up the creator from seed data and passes it to `ai-review.service.ts`.
3. The service builds a structured prompt that grounds the model strictly in the provided campaign and creator data. The system prompt instructs the model not to invent facts.
4. The raw response is parsed as JSON and validated against `AiReviewResultSchema` (Zod) before it ever reaches the client.
5. Any failure (network, malformed JSON, schema mismatch) returns `{ success: false, error: "..." }` — surfaced as an inline error in the UI.

Models: `claude-haiku-4-5-20251001` (Anthropic, default) or `gemini-2.5-flash` (Gemini, set `AI_PROVIDER=gemini`). Both are fast and low-cost for structured extraction tasks.

**Error handling** — every possible failure is caught and returned as `{ success: false, error: "..." }`:
- Missing API key → friendly config instruction
- 401 invalid key → specific "check your .env.local" message
- 429 rate limit / quota exceeded → "try again" message
- Network failure → "check connection" message
- Malformed JSON from model → retry message
- Response doesn't match Zod schema → retry message
- Unhandled Server Action exception → caught in the hook's try/catch, never an `unhandledRejection`

---

## Tradeoffs & What I'd Improve with More Time

**Tradeoffs made:**
- **In-memory state only** — creator status and AI results live in React state and reset on reload. Per spec, but `localStorage` persistence would take ~15 min and make the tool stickier.
- **Single campaign** — the campaign is hardcoded. A real tool would let managers switch between campaigns.
- **Haiku vs. Sonnet** — Haiku for demo speed. Sonnet would give more nuanced reasoning on edge cases.
- **No streaming** — the AI response arrives all at once. Streaming would improve perceived latency for the loading state.

**Would improve with more time:**
- Streaming AI responses with a typewriter reveal for reasoning text.
- Keyboard navigation between creators (↑/↓ arrow keys).
- "Copy suggested reply" button on the AI review card.
- `localStorage` persistence so state survives page refresh.
