import type { Creator } from '@/types'

interface CreatorProfileProps {
  creator: Creator
}

function StatPill({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col items-center bg-gray-50 rounded-lg px-4 py-2.5 min-w-[80px]">
      <span className="text-base font-bold text-gray-900">{value}</span>
      <span className="text-xs text-gray-500 mt-0.5">{label}</span>
    </div>
  )
}

function formatFollowers(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`
  if (n >= 1_000) return `${(n / 1_000).toFixed(0)}K`
  return String(n)
}

export function CreatorProfile({ creator }: CreatorProfileProps) {
  const { creatorName, handle, platform, followers, engagementRate, audienceSummary, contentStyle, pastBrandDeals } =
    creator

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h2 className="text-xl font-bold text-gray-900">{creatorName}</h2>
          <div className="flex items-center gap-2 mt-0.5">
            <span className="text-sm text-gray-500">{handle}</span>
            <span className="text-gray-300">·</span>
            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-600">
              {platform}
            </span>
          </div>
        </div>
      </div>

      <div className="flex gap-2.5">
        <StatPill label="Followers" value={formatFollowers(followers)} />
        <StatPill label="Engagement" value={`${engagementRate}%`} />
      </div>

      <div>
        <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1.5">
          Audience
        </h3>
        <p className="text-sm text-gray-700 leading-relaxed">{audienceSummary}</p>
      </div>

      <div>
        <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1.5">
          Content Style
        </h3>
        <p className="text-sm text-gray-700 leading-relaxed">{contentStyle}</p>
      </div>

      <div>
        <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1.5">
          Past Brand Deals
        </h3>
        <div className="flex flex-wrap gap-1.5">
          {pastBrandDeals.map((brand) => (
            <span
              key={brand}
              className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700"
            >
              {brand}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
