import type { Creator } from '@/types'
import { formatFollowers } from '@/utils/format-followers'

interface CreatorProfileProps {
  creator: Creator
}

type Platform = 'TikTok' | 'Instagram' | 'YouTube'

const ENGAGEMENT_BENCHMARKS: Record<Platform, { high: number; medium: number }> = {
  TikTok:    { high: 5, medium: 2 },
  Instagram: { high: 3, medium: 1 },
  YouTube:   { high: 5, medium: 2 },
}

function engagementColor(rate: number, platform: string): string {
  const b = ENGAGEMENT_BENCHMARKS[platform as Platform] ?? { high: 4, medium: 2 }
  if (rate >= b.high) return 'text-emerald-600'
  if (rate >= b.medium) return 'text-amber-500'
  return 'text-red-500'
}

function engagementLabel(rate: number, platform: string): string {
  const b = ENGAGEMENT_BENCHMARKS[platform as Platform] ?? { high: 4, medium: 2 }
  if (rate >= b.high) return 'High'
  if (rate >= b.medium) return 'Avg'
  return 'Low'
}

function creatorTier(followers: number): { label: string; color: string } {
  if (followers >= 1_000_000) return { label: 'Macro', color: 'bg-purple-100 text-purple-600' }
  if (followers >= 100_000)   return { label: 'Mid-tier', color: 'bg-blue-100 text-blue-600' }
  if (followers >= 10_000)    return { label: 'Micro', color: 'bg-teal-100 text-teal-600' }
  return { label: 'Nano', color: 'bg-gray-100 text-gray-500' }
}

export function CreatorProfile({ creator }: CreatorProfileProps) {
  const { platform, followers, engagementRate, audienceSummary, contentStyle, pastBrandDeals } = creator
  const engColor = engagementColor(engagementRate, platform)
  const engTag = engagementLabel(engagementRate, platform)
  const tier = creatorTier(followers)

  return (
    <div className="space-y-4 sm:space-y-5" data-tour="creator-profile">

      {/* Stats */}
      <div className="grid grid-cols-2 gap-2 sm:gap-3">
        <div className="bg-gray-50 rounded-2xl px-3.5 py-3 sm:px-4 sm:py-3.5 ring-1 ring-black/[0.03]">
          <div className="flex items-center justify-between mb-1">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-400">Followers</p>
            <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-full ${tier.color}`}>
              {tier.label}
            </span>
          </div>
          <p className="text-xl sm:text-2xl font-bold text-gray-900">{formatFollowers(followers)}</p>
        </div>
        <div className="bg-gray-50 rounded-2xl px-3.5 py-3 sm:px-4 sm:py-3.5 ring-1 ring-black/[0.03]">
          <div className="flex items-center justify-between mb-1">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-400">Engagement</p>
            <span className={`text-[10px] font-semibold ${engColor}`}>{engTag}</span>
          </div>
          <p className={`text-xl sm:text-2xl font-bold ${engColor}`}>{engagementRate}%</p>
        </div>
      </div>

      {/* Details */}
      <div className="space-y-3 sm:space-y-4">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-400 mb-1.5">Audience</p>
          <p className="text-sm text-gray-600 leading-relaxed">{audienceSummary}</p>
        </div>

        <div>
          <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-400 mb-1.5">Content Style</p>
          <p className="text-sm text-gray-600 leading-relaxed">{contentStyle}</p>
        </div>

        <div>
          <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-400 mb-2">Past Brand Deals</p>
          <div className="flex flex-wrap gap-1.5">
            {pastBrandDeals.map((brand) => (
              <span
                key={brand}
                className="inline-flex items-center px-2.5 sm:px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600"
              >
                {brand}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
