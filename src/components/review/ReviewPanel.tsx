import type { Campaign, Creator } from '@/types'
import { Badge } from '@/components/ui/Badge'
import { AiReviewCard } from './AiReviewCard'
import { ApplicationSection } from './ApplicationSection'
import { CreatorProfile } from './CreatorProfile'
import { DecisionSection } from './DecisionSection'
import { RunReviewSection } from './RunReviewSection'

interface ReviewPanelProps {
  creator: Creator
  campaign: Campaign
  isReviewing: boolean
  reviewError: string | null
  onRunReview: () => void
  onApprove: () => void
  onReject: () => void
  onNeedsInfo: () => void
}

const STATUS_LABEL = {
  pending: 'Pending',
  approved: 'Approved',
  rejected: 'Rejected',
  needs_info: 'Needs Info',
} as const

export function ReviewPanel({
  creator,
  campaign,
  isReviewing,
  reviewError,
  onRunReview,
  onApprove,
  onReject,
  onNeedsInfo,
}: ReviewPanelProps) {
  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200 bg-white flex items-center justify-between shrink-0">
        <div>
          <h2 className="text-base font-semibold text-gray-900">{creator.creatorName}</h2>
          <p className="text-sm text-gray-500">{creator.handle}</p>
        </div>
        <Badge variant={creator.status} size="md">
          {STATUS_LABEL[creator.status]}
        </Badge>
      </div>

      <div className="flex-1 overflow-y-auto px-6 py-5 space-y-6">
        <CreatorProfile creator={creator} />

        <div className="border-t border-gray-100 pt-5">
          <ApplicationSection creator={creator} campaign={campaign} />
        </div>

        <div className="border-t border-gray-100 pt-5">
          <RunReviewSection
            isReviewing={isReviewing}
            hasAiReview={creator.aiReview !== undefined}
            reviewError={reviewError}
            onRunReview={onRunReview}
          />
        </div>

        {isReviewing && (
          <div className="flex items-center justify-center gap-3 py-8">
            <svg
              className="h-5 w-5 animate-spin text-[#ff5a00]"
              fill="none"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            <span className="text-sm text-gray-500">Running AI review…</span>
          </div>
        )}

        {!isReviewing && creator.aiReview !== undefined && (
          <div className="border-t border-gray-100 pt-1">
            <AiReviewCard review={creator.aiReview} />
          </div>
        )}

        <div className="border-t border-gray-100 pt-5 pb-4">
          <DecisionSection
            currentStatus={creator.status}
            onApprove={onApprove}
            onReject={onReject}
            onNeedsInfo={onNeedsInfo}
          />
        </div>
      </div>
    </div>
  )
}
