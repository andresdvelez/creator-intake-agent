import type { Creator } from '@/types'
import { formatFollowers } from '@/utils/format-followers'

interface CreatorProfileProps {
  creator: Creator
}

export function CreatorProfile({ creator }: CreatorProfileProps) {
  const { creatorName, handle, platform, followers, engagementRate, audienceSummary, contentStyle, pastBrandDeals } =
    creator

  return (
    <div className="space-y-4 sm:space-y-5" data-tour="creator-profile">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h2 className="text-lg sm:text-xl font-bold text-gray-900">{creatorName}</h2>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-xs sm:text-sm text-gray-400">{handle}</span>
            <span className="text-gray-200">·</span>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-500">
              {platform}
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 sm:gap-3">
        <div className="bg-gray-50 rounded-2xl px-3.5 py-3 sm:px-4 sm:py-3.5 ring-1 ring-black/[0.03]">
          <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-400 mb-1">Followers</p>
          <p className="text-xl sm:text-2xl font-bold text-gray-900">{formatFollowers(followers)}</p>
        </div>
        <div className="bg-gray-50 rounded-2xl px-3.5 py-3 sm:px-4 sm:py-3.5 ring-1 ring-black/[0.03]">
          <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-400 mb-1">Engagement</p>
          <p className="text-xl sm:text-2xl font-bold text-gray-900">{engagementRate}%</p>
        </div>
      </div>

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
