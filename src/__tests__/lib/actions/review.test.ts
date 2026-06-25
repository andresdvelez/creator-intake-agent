import { describe, it, expect, beforeEach, afterEach } from 'bun:test'
import { runCreatorReview } from '@/lib/actions/review'

// Snapshot of env keys touched by the service so we can restore them
let savedAnthropicKey: string | undefined

beforeEach(() => {
  savedAnthropicKey = process.env.ANTHROPIC_API_KEY
  delete process.env.ANTHROPIC_API_KEY
  delete process.env.AI_PROVIDER
})

afterEach(() => {
  if (savedAnthropicKey !== undefined) process.env.ANTHROPIC_API_KEY = savedAnthropicKey
  else delete process.env.ANTHROPIC_API_KEY
})

describe('runCreatorReview — input validation', () => {
  it('returns error for empty creatorId', async () => {
    const result = await runCreatorReview('')
    expect(result.success).toBe(false)
    if (!result.success) expect(result.error).toBe('Invalid creator ID')
  })

  it('returns error for non-existent creatorId', async () => {
    const result = await runCreatorReview('999-does-not-exist')
    expect(result.success).toBe(false)
    if (!result.success) expect(result.error).toBe('Creator not found')
  })
})

describe('runCreatorReview — delegation to AI service', () => {
  it('calls the AI service for creator id "1" (Mia Lopez)', async () => {
    // With no API key the service returns a predictable error, proving the action
    // successfully found the creator and delegated to runAiReview.
    const result = await runCreatorReview('1')
    expect(result.success).toBe(false)
    if (!result.success) expect(result.error).toContain('ANTHROPIC_API_KEY')
  })

  it('calls the AI service for creator id "2" (Daniel Kim)', async () => {
    const result = await runCreatorReview('2')
    expect(result.success).toBe(false)
    if (!result.success) expect(result.error).toContain('ANTHROPIC_API_KEY')
  })

  it('calls the AI service for creator id "3" (Ava Martinez)', async () => {
    const result = await runCreatorReview('3')
    expect(result.success).toBe(false)
    if (!result.success) expect(result.error).toContain('ANTHROPIC_API_KEY')
  })
})
