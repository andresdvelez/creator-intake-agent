'use client'

import { useState } from 'react'

import type { AiReviewResult, Creator, CreatorStatus } from '@/types'
import { runCreatorReview } from '@/lib/actions/review'
import { CREATORS } from '@/lib/data/creators'

interface WorkspaceState {
  creators: Creator[]
  selectedId: string
  isReviewing: boolean
  reviewError: string | null
}

interface WorkspaceActions {
  selectedCreator: Creator | null
  setSelectedId: (id: string) => void
  handleRunReview: () => Promise<void>
  handleApprove: () => void
  handleReject: () => void
  handleNeedsInfo: () => void
}

export function useReviewWorkspace(): WorkspaceState & WorkspaceActions {
  const [creators, setCreators] = useState<Creator[]>(CREATORS)
  const [selectedId, setSelectedId] = useState<string>(CREATORS[0]?.id ?? '')
  const [isReviewing, setIsReviewing] = useState(false)
  const [reviewError, setReviewError] = useState<string | null>(null)

  const selectedCreator = creators.find((c) => c.id === selectedId) ?? null

  function updateStatus(id: string, status: CreatorStatus) {
    setCreators((prev) => prev.map((c) => (c.id === id ? { ...c, status } : c)))
  }

  function applyAiReview(id: string, aiReview: AiReviewResult) {
    setCreators((prev) => prev.map((c) => (c.id === id ? { ...c, aiReview } : c)))
  }

  async function handleRunReview() {
    if (!selectedId) return
    setIsReviewing(true)
    setReviewError(null)

    try {
      const result = await runCreatorReview(selectedId)
      if (result.success) {
        applyAiReview(selectedId, result.data)
      } else {
        setReviewError(result.error)
      }
    } catch {
      setReviewError('An unexpected error occurred — please try again')
    } finally {
      setIsReviewing(false)
    }
  }

  function handleApprove() {
    if (selectedId) updateStatus(selectedId, 'approved')
  }

  function handleReject() {
    if (selectedId) updateStatus(selectedId, 'rejected')
  }

  function handleNeedsInfo() {
    if (selectedId) updateStatus(selectedId, 'needs_info')
  }

  return {
    creators,
    selectedId,
    selectedCreator,
    isReviewing,
    reviewError,
    setSelectedId,
    handleRunReview,
    handleApprove,
    handleReject,
    handleNeedsInfo,
  }
}
