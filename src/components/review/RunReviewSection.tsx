import { Button } from "@/components/ui/Button";

interface RunReviewSectionProps {
  isReviewing: boolean;
  hasAiReview: boolean;
  reviewError: string | null;
  onRunReview: () => void;
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

      <div className="flex items-center justify-between gap-4 bg-gray-50 rounded-2xl px-4 py-3.5 ring-1 ring-black/[0.03]">
        <div className="min-w-0">
          <p className="text-xs font-semibold text-gray-700">
            {hasAiReview ? "Re-run AI Review" : "Run AI Review"}
          </p>
          <p className="text-[10px] text-gray-400 mt-0.5">
            Evaluate creator against campaign goals, audience, and brand safety
          </p>
        </div>
        <Button
          variant="primary"
          size="sm"
          isLoading={isReviewing}
          onClick={onRunReview}
          className="shrink-0"
        >
          {!isReviewing && (
            <svg
              className="h-3.5 w-3.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z"
              />
            </svg>
          )}
          {hasAiReview ? "Re-run" : "Analyze"}
        </Button>
      </div>
    </div>
  );
}
