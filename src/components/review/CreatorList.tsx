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
    <aside className="w-72 shrink-0 border-r border-gray-200 bg-white flex flex-col h-full" data-tour="creator-list">
      <div className="px-4 py-4 border-b border-gray-100">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-gray-400">
          Applications
        </h2>
        <div className="flex items-center gap-3 mt-1">
          <span className="text-sm text-gray-500">
            <span className="font-medium text-gray-900">{creators.length}</span> total
          </span>
          <span className="text-gray-300">·</span>
          <span className="text-sm text-gray-500">
            <span className="font-medium text-gray-900">{reviewed}</span> reviewed
          </span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto divide-y divide-gray-100">
        {creators.map((creator) => (
          <CreatorListItem
            key={creator.id}
            creator={creator}
            isSelected={creator.id === selectedId}
            onSelect={onSelect}
          />
        ))}
      </div>
    </aside>
  )
}
