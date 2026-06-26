import type { Creator } from '@/types'
import { CreatorListItem } from './CreatorListItem'

interface CreatorListProps {
  creators: Creator[]
  selectedId: string
  onSelect: (id: string) => void
}

export function CreatorList({ creators, selectedId, onSelect }: CreatorListProps) {
  const pending = creators.filter((c) => c.status === 'pending').length
  const reviewed = creators.length - pending

  return (
    <aside
      className="shrink-0 bg-white rounded-2xl shadow-sm ring-1 ring-black/[0.04] flex flex-col overflow-hidden md:w-64 lg:w-72 md:h-full"
      data-tour="creator-list"
    >
      <div className="px-4 pt-4 pb-3 sm:px-5 sm:pt-5 sm:pb-4 shrink-0 flex items-center justify-between md:block">
        <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-400 md:mb-3">
          Applications
        </p>
        <div className="flex items-center gap-3 md:gap-4">
          <div>
            <span className="text-lg md:text-2xl font-bold text-gray-900">{creators.length}</span>
            <span className="ml-1 text-xs text-gray-400">total</span>
          </div>
          <div className="h-5 md:h-6 w-px bg-gray-100" />
          <div>
            <span className="text-lg md:text-2xl font-bold text-gray-900">{reviewed}</span>
            <span className="ml-1 text-xs text-gray-400">reviewed</span>
          </div>
        </div>
      </div>

      {/* Mobile: horizontal scroll row — Desktop: vertical list */}
      <div className="min-h-0 overflow-x-auto md:overflow-x-hidden overflow-y-hidden md:overflow-y-auto flex-1 px-2 pb-3">
        <div className="flex flex-row md:flex-col gap-2 md:gap-1 min-w-max md:min-w-0">
          {creators.map((creator) => (
            <CreatorListItem
              key={creator.id}
              creator={creator}
              isSelected={creator.id === selectedId}
              onSelect={onSelect}
            />
          ))}
        </div>
      </div>
    </aside>
  )
}
