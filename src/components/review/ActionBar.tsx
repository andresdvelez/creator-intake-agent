import type { CreatorStatus } from '@/types'
import { Button } from '@/components/ui/Button'

interface ActionBarProps {
  currentStatus: CreatorStatus
  isReviewing: boolean
  hasAiReview: boolean
  reviewError: string | null
  onRunReview: () => void
  onApprove: () => void
  onReject: () => void
  onNeedsInfo: () => void
}

export function ActionBar({
  currentStatus,
  isReviewing,
  hasAiReview,
  reviewError,
  onRunReview,
  onApprove,
  onReject,
  onNeedsInfo,
}: ActionBarProps) {
  return (
    <div className="space-y-3">
      {reviewError && (
        <div className="flex items-start gap-2.5 rounded-lg bg-red-50 border border-red-200 px-3.5 py-3">
          <svg
            className="h-4 w-4 text-red-500 mt-0.5 shrink-0"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <p className="text-sm text-red-700">{reviewError}</p>
        </div>
      )}

      <Button
        variant="primary"
        size="lg"
        isLoading={isReviewing}
        onClick={onRunReview}
        className="w-full"
      >
        {hasAiReview ? 'Re-run AI Review' : 'Run AI Review'}
      </Button>

      <div className="grid grid-cols-3 gap-2">
        <Button
          variant="success"
          size="sm"
          onClick={onApprove}
          disabled={currentStatus === 'approved'}
          className="w-full"
        >
          Approve
        </Button>
        <Button
          variant="warning"
          size="sm"
          onClick={onNeedsInfo}
          disabled={currentStatus === 'needs_info'}
          className="w-full"
        >
          Needs Info
        </Button>
        <Button
          variant="danger"
          size="sm"
          onClick={onReject}
          disabled={currentStatus === 'rejected'}
          className="w-full"
        >
          Reject
        </Button>
      </div>
    </div>
  )
}
