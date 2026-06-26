import type { Creator, CreatorStatus } from '@/types'
import { Badge } from '@/components/ui/Badge'
import { formatFollowers } from '@/utils/format-followers'
import { getInitials } from '@/utils/get-name-initials'

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

export function CreatorListItem({ creator, isSelected, onSelect }: CreatorListItemProps) {
  const { id, creatorName, handle, platform, status, aiReview, followers } = creator

  return (
    <button
      onClick={() => onSelect(id)}
      className={`text-left rounded-xl px-3 py-2.5 md:py-3 transition-all duration-150 cursor-pointer
        w-44 sm:w-52 md:w-full shrink-0 md:shrink
        ${isSelected
          ? 'bg-[#fff3ee] ring-1 ring-[#ff5a00]/20'
          : 'hover:bg-gray-50 active:bg-gray-100'
        }`}
    >
      <div className="flex flex-col md:flex-row items-start md:items-center gap-2 md:gap-3">
        <div
          className={`h-8 w-8 md:h-9 md:w-9 rounded-full flex items-center justify-center text-xs font-bold shrink-0 transition-colors ${
            isSelected ? 'bg-[#ff5a00] text-white' : 'bg-gray-100 text-gray-500'
          }`}
        >
          {getInitials(creatorName)}
        </div>

        <div className="min-w-0 flex-1 w-full">
          <div className="flex items-center justify-between gap-1.5 md:gap-2">
            <span className="text-xs md:text-sm font-semibold text-gray-900 truncate">{creatorName}</span>
            <Badge variant={status}>{STATUS_LABEL[status]}</Badge>
          </div>

          <div className="flex items-center gap-1 md:gap-1.5 mt-0.5">
            <span className="hidden md:inline text-xs text-gray-400 truncate">{handle}</span>
            <span className="hidden md:inline text-gray-200">·</span>
            <span className="text-[10px] md:text-xs text-gray-400">{platform}</span>
            <span className="text-gray-200">·</span>
            <span className="text-[10px] md:text-xs text-gray-400">{formatFollowers(followers)}</span>
          </div>

          {aiReview !== undefined && (
            <div className="flex items-center gap-1.5 mt-1">
              <span className="text-[10px] font-semibold text-[#ff5a00]">{aiReview.fitScore}/10</span>
              <span className="text-[10px] text-gray-400">fit</span>
            </div>
          )}
        </div>
      </div>
    </button>
  )
}
