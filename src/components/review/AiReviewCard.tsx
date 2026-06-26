import type { AiRecommendation, AiReviewResult } from '@/types'
import { Badge } from '@/components/ui/Badge'
import { CopyButton } from '@/components/ui/CopyButton'
import { FitScoreBar } from './FitScoreBar'

interface AiReviewCardProps {
  review: AiReviewResult
}

type BadgeVariant = 'approved' | 'rejected' | 'needs_info' | 'manual_review' | 'pending'

const RECOMMENDATION_LABEL: Record<AiRecommendation, string> = {
  approve: 'Approve',
  reject: 'Reject',
  needs_info: 'Needs Info',
  manual_review: 'Manual Review',
}

const RECOMMENDATION_BADGE: Record<AiRecommendation, BadgeVariant> = {
  approve: 'approved',
  reject: 'rejected',
  needs_info: 'needs_info',
  manual_review: 'manual_review',
}

function ListSection({ title, items }: { title: string; items: string[] }) {
  if (items.length === 0) return null
  return (
    <div>
      <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-400 mb-2">{title}</p>
      <ul className="space-y-1.5">
        {items.map((item, i) => (
          <li key={i} className="flex items-start gap-2.5 text-sm text-gray-600">
            <span className="mt-2 h-1.5 w-1.5 rounded-full bg-gray-300 shrink-0" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  )
}

export function AiReviewCard({ review }: AiReviewCardProps) {
  const { fitScore, recommendation, reasoning, risks, missingInfo, suggestedReply } = review
  const badgeVariant = RECOMMENDATION_BADGE[recommendation]

  return (
    <div className="bg-gray-50 rounded-2xl ring-1 ring-black/[0.04] overflow-hidden">

      {/* Card header */}
      <div className="px-4 sm:px-5 py-3.5 sm:py-4 flex items-center justify-between border-b border-gray-100">
        <div className="flex items-center gap-2">
          <div className="h-5 w-5 rounded-full bg-[#ff5a00]/10 flex items-center justify-center shrink-0">
            <div className="h-2 w-2 rounded-full bg-[#ff5a00]" />
          </div>
          <span className="text-xs font-semibold text-gray-500">AI Review</span>
        </div>
        <Badge variant={badgeVariant} size="md">
          {RECOMMENDATION_LABEL[recommendation]}
        </Badge>
      </div>

      {/* Hero fit score */}
      <div className="px-4 sm:px-5 pt-4 sm:pt-5 pb-4 border-b border-gray-100">
        <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-400 mb-3">
          Campaign Fit Score
        </p>
        <FitScoreBar score={fitScore} />
      </div>

      {/* Details */}
      <div className="p-4 sm:p-5 space-y-4 sm:space-y-5">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-400 mb-2">Reasoning</p>
          <p className="text-sm text-gray-600 leading-relaxed">{reasoning}</p>
        </div>

        <ListSection title="Risks" items={risks} />
        <ListSection title="Missing Info" items={missingInfo} />

        <div>
          <div className="flex items-center justify-between mb-2">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-400">
              Suggested Reply
            </p>
            <CopyButton text={suggestedReply} />
          </div>
          <div className="bg-[#fff3ee] rounded-xl px-3.5 sm:px-4 py-3 sm:py-3.5 ring-1 ring-[#ff5a00]/10">
            <p className="text-sm text-gray-700 leading-relaxed">{suggestedReply}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
