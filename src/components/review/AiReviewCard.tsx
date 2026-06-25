import type { AiRecommendation, AiReviewResult } from '@/types'
import { Badge } from '@/components/ui/Badge'
import { FitScoreBar } from './FitScoreBar'

interface AiReviewCardProps {
  review: AiReviewResult
}

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

type BadgeVariant = 'approved' | 'rejected' | 'needs_info' | 'manual_review' | 'pending'

function ListSection({ title, items }: { title: string; items: string[] }) {
  if (items.length === 0) return null
  return (
    <div>
      <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">{title}</h4>
      <ul className="space-y-1.5">
        {items.map((item, i) => (
          <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-gray-400 shrink-0" />
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
    <div className="border border-gray-200 rounded-xl overflow-hidden bg-white">
      <div className="px-4 py-3 bg-gray-50 border-b border-gray-200 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">
            AI Review
          </span>
        </div>
        <Badge variant={badgeVariant} size="md">
          {RECOMMENDATION_LABEL[recommendation]}
        </Badge>
      </div>

      <div className="p-4 space-y-4">
        <FitScoreBar score={fitScore} />

        <div>
          <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">
            Reasoning
          </h4>
          <p className="text-sm text-gray-700 leading-relaxed">{reasoning}</p>
        </div>

        <ListSection title="Risks" items={risks} />
        <ListSection title="Missing Info" items={missingInfo} />

        <div>
          <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">
            Suggested Reply
          </h4>
          <div className="bg-[#fff3ee] rounded-lg px-3.5 py-3 border border-orange-100">
            <p className="text-sm text-gray-800 leading-relaxed">{suggestedReply}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
