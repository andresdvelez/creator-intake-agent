'use client'

import { CAMPAIGN } from '@/lib/data/campaign'
import { useReviewWorkspace } from '@/hooks/useReviewWorkspace'
import { CreatorList } from './CreatorList'
import { ReviewPanel } from './ReviewPanel'

export function ReviewWorkspace() {
  const {
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
  } = useReviewWorkspace()

  return (
    <div className="flex h-full overflow-hidden">
      <CreatorList creators={creators} selectedId={selectedId} onSelect={setSelectedId} />

      <main className="flex-1 overflow-hidden">
        {selectedCreator !== null ? (
          <ReviewPanel
            creator={selectedCreator}
            campaign={CAMPAIGN}
            isReviewing={isReviewing}
            reviewError={reviewError}
            onRunReview={handleRunReview}
            onApprove={handleApprove}
            onReject={handleReject}
            onNeedsInfo={handleNeedsInfo}
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <p className="text-sm text-gray-400">Select a creator to begin review</p>
          </div>
        )}
      </main>
    </div>
  )
}
