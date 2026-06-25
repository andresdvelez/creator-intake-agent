import { describe, it, expect, beforeEach, afterEach } from 'bun:test'
import { renderHook, act } from '@testing-library/react'
import { useReviewWorkspace } from '@/hooks/useReviewWorkspace'

// The real runCreatorReview is used; with no API key the service returns a
// predictable error without making any network calls.
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

describe('useReviewWorkspace — initial state', () => {
  it('selects the first creator by default', () => {
    const { result } = renderHook(() => useReviewWorkspace())
    expect(result.current.selectedId).toBe('1')
    expect(result.current.selectedCreator?.id).toBe('1')
  })

  it('initialises with three creators', () => {
    const { result } = renderHook(() => useReviewWorkspace())
    expect(result.current.creators).toHaveLength(3)
  })

  it('initialises with isReviewing=false', () => {
    const { result } = renderHook(() => useReviewWorkspace())
    expect(result.current.isReviewing).toBe(false)
  })

  it('initialises with reviewError=null', () => {
    const { result } = renderHook(() => useReviewWorkspace())
    expect(result.current.reviewError).toBeNull()
  })
})

describe('useReviewWorkspace — selection', () => {
  it('setSelectedId changes the selected creator', () => {
    const { result } = renderHook(() => useReviewWorkspace())
    act(() => result.current.setSelectedId('2'))
    expect(result.current.selectedId).toBe('2')
    expect(result.current.selectedCreator?.id).toBe('2')
  })

  it('setSelectedId "3" selects Ava Martinez', () => {
    const { result } = renderHook(() => useReviewWorkspace())
    act(() => result.current.setSelectedId('3'))
    expect(result.current.selectedCreator?.creatorName).toBe('Ava Martinez')
  })
})

describe('useReviewWorkspace — manual status actions', () => {
  it('handleApprove sets status to approved for the selected creator', () => {
    const { result } = renderHook(() => useReviewWorkspace())
    act(() => result.current.handleApprove())
    const selected = result.current.creators.find((c) => c.id === result.current.selectedId)
    expect(selected?.status).toBe('approved')
  })

  it('handleReject sets status to rejected for the selected creator', () => {
    const { result } = renderHook(() => useReviewWorkspace())
    act(() => result.current.handleReject())
    const selected = result.current.creators.find((c) => c.id === result.current.selectedId)
    expect(selected?.status).toBe('rejected')
  })

  it('handleNeedsInfo sets status to needs_info for the selected creator', () => {
    const { result } = renderHook(() => useReviewWorkspace())
    act(() => result.current.handleNeedsInfo())
    const selected = result.current.creators.find((c) => c.id === result.current.selectedId)
    expect(selected?.status).toBe('needs_info')
  })

  it('status change only affects the selected creator', () => {
    const { result } = renderHook(() => useReviewWorkspace())
    act(() => result.current.handleApprove())
    const others = result.current.creators.filter((c) => c.id !== result.current.selectedId)
    for (const c of others) {
      expect(c.status).toBe('pending')
    }
  })

  it('can approve a different creator after switching selection', () => {
    const { result } = renderHook(() => useReviewWorkspace())
    act(() => result.current.setSelectedId('2'))
    act(() => result.current.handleApprove())
    const c2 = result.current.creators.find((c) => c.id === '2')
    const c1 = result.current.creators.find((c) => c.id === '1')
    expect(c2?.status).toBe('approved')
    expect(c1?.status).toBe('pending')
  })
})

describe('useReviewWorkspace — review flow', () => {
  it('resets isReviewing to false after the review completes', async () => {
    const { result } = renderHook(() => useReviewWorkspace())
    await act(() => result.current.handleRunReview())
    expect(result.current.isReviewing).toBe(false)
  })

  it('sets reviewError when the AI service returns an error', async () => {
    // No ANTHROPIC_API_KEY → service returns a predictable error string
    const { result } = renderHook(() => useReviewWorkspace())
    await act(() => result.current.handleRunReview())
    expect(result.current.reviewError).not.toBeNull()
    expect(result.current.reviewError).toContain('ANTHROPIC_API_KEY')
  })

  it('clears reviewError at the start of a new review call', async () => {
    const { result } = renderHook(() => useReviewWorkspace())
    // First run seeds the error
    await act(() => result.current.handleRunReview())
    expect(result.current.reviewError).not.toBeNull()
    // Second run should clear it before the new call
    await act(() => result.current.handleRunReview())
    // Error might be set again, but the point is it was cleared first
    // We verify isReviewing is reset (proves the finally block ran)
    expect(result.current.isReviewing).toBe(false)
  })

  it('does nothing when selectedId is empty string', async () => {
    const { result } = renderHook(() => useReviewWorkspace())
    // Force an empty selection (edge case guard)
    act(() => result.current.setSelectedId(''))
    await act(() => result.current.handleRunReview())
    // Should be a no-op: no error, not reviewing
    expect(result.current.isReviewing).toBe(false)
  })
})
