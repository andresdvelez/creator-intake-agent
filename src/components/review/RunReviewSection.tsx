import { Button } from '@/components/ui/Button'

interface RunReviewSectionProps {
  isReviewing: boolean
  hasAiReview: boolean
  reviewError: string | null
  onRunReview: () => void
}

export function RunReviewSection({
  isReviewing,
  hasAiReview,
  reviewError,
  onRunReview,
}: RunReviewSectionProps) {
  return (
    <div className="space-y-3" data-tour="run-review">
      {reviewError && (
        <div className="flex items-start gap-3 rounded-2xl bg-red-50 ring-1 ring-red-100 px-4 py-3.5">
          <svg
            className="h-4 w-4 text-red-400 mt-0.5 shrink-0"
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
          <p className="text-sm text-red-600">{reviewError}</p>
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
    </div>
  )
}
