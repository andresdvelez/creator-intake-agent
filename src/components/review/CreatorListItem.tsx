import type { Creator, CreatorStatus } from '@/types'
import { Badge } from '@/components/ui/Badge'

interface CreatorListItemProps {
  creator: Creator
  isSelected: boolean
  onSelect: (id: string) => void
}

const STATUS_LABEL: Record<CreatorStatus, string> = {
  pending: 'Pending',
  approved: 'Approved',
  rejected: 'Rejected',
  needs_info: 'Needs Info',
}

function formatFollowers(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`
  if (n >= 1_000) return `${(n / 1_000).toFixed(0)}K`
  return String(n)
}

function getInitials(name: string): string {
  return name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

export function CreatorListItem({ creator, isSelected, onSelect }: CreatorListItemProps) {
  const { id, creatorName, handle, platform, status, aiReview, followers } = creator

  return (
    <button
      onClick={() => onSelect(id)}
      className={`w-full text-left px-4 py-3.5 transition-colors duration-100 border-l-2 ${
        isSelected
          ? 'bg-[#fff3ee] border-l-[#ff5a00]'
          : 'border-l-transparent hover:bg-gray-50 active:bg-gray-100'
      }`}
    >
      <div className="flex items-center gap-3">
        <div
          className={`h-9 w-9 rounded-full flex items-center justify-center text-xs font-semibold shrink-0 ${
            isSelected ? 'bg-[#ff5a00] text-white' : 'bg-gray-200 text-gray-600'
          }`}
        >
          {getInitials(creatorName)}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-2">
            <span className="text-sm font-semibold text-gray-900 truncate">{creatorName}</span>
            <Badge variant={status}>{STATUS_LABEL[status]}</Badge>
          </div>
          <div className="flex items-center gap-2 mt-0.5">
            <span className="text-xs text-gray-500 truncate">{handle}</span>
            <span className="text-gray-300">·</span>
            <span className="text-xs text-gray-500">{platform}</span>
            <span className="text-gray-300">·</span>
            <span className="text-xs text-gray-500">{formatFollowers(followers)}</span>
          </div>
          {aiReview !== undefined && (
            <div className="flex items-center gap-1.5 mt-1">
              <span className="text-xs text-gray-400">Fit score</span>
              <span className="text-xs font-semibold text-[#ff5a00]">{aiReview.fitScore}/10</span>
            </div>
          )}
        </div>
      </div>
    </button>
  )
}
