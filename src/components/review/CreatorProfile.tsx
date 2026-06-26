import type { Creator, CreatorPlatform } from "@/types";
import { formatFollowers } from "@/utils/format-followers";

interface CreatorProfileProps {
  creator: Creator;
}

const ENGAGEMENT_BENCHMARKS: Record<
  CreatorPlatform,
  { high: number; medium: number }
> = {
  TikTok: { high: 5, medium: 2 },
  Instagram: { high: 3, medium: 1 },
  YouTube: { high: 5, medium: 2 },
};

function engagementInfo(
  rate: number,
  platform: CreatorPlatform,
): { color: string; label: string } {
  const b = ENGAGEMENT_BENCHMARKS[platform];
  if (rate >= b.high) return { color: "text-emerald-600", label: "High" };
  if (rate >= b.medium) return { color: "text-amber-500", label: "Avg" };
  return { color: "text-red-500", label: "Low" };
}

const CREATOR_TIERS = [
  { min: 1_000_000, label: "Macro", color: "bg-purple-100 text-purple-600" },
  { min: 100_000, label: "Mid-tier", color: "bg-blue-100 text-blue-600" },
  { min: 10_000, label: "Micro", color: "bg-teal-100 text-teal-600" },
  { min: 0, label: "Nano", color: "bg-gray-100 text-gray-500" },
] as const;

function creatorTier(followers: number) {
  return CREATOR_TIERS.find((t) => followers >= t.min) ?? CREATOR_TIERS[3];
}

export function CreatorProfile({ creator }: CreatorProfileProps) {
  const {
    platform,
    followers,
    engagementRate,
    audienceSummary,
    contentStyle,
    pastBrandDeals,
  } = creator;
  const { color: engColor, label: engTag } = engagementInfo(
    engagementRate,
    platform,
  );
  const tier = creatorTier(followers);

  return (
    <div className="space-y-4 sm:space-y-5" data-tour="creator-profile">
      {/* Stats */}
      <div className="grid grid-cols-2 gap-2 sm:gap-3">
        <div className="bg-gray-50 rounded-2xl px-3.5 py-3 sm:px-4 sm:py-3.5 ring-1 ring-black/[0.03]">
          <div className="flex items-center justify-between mb-1">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-400">
              Followers
            </p>
            <span
              className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-full ${tier.color}`}
            >
              {tier.label}
            </span>
          </div>
          <p className="text-xl sm:text-2xl font-bold text-gray-900">
            {formatFollowers(followers)}
          </p>
        </div>
        <div className="bg-gray-50 rounded-2xl px-3.5 py-3 sm:px-4 sm:py-3.5 ring-1 ring-black/[0.03]">
          <div className="flex items-center justify-between mb-1">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-400">
              Engagement
            </p>
            <span className={`text-[10px] font-semibold ${engColor}`}>
              {engTag}
            </span>
          </div>
          <p className={`text-xl sm:text-2xl font-bold ${engColor}`}>
            {engagementRate}%
          </p>
        </div>
      </div>

      {/* Details */}
      <div className="space-y-3 sm:space-y-4">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-400 mb-1.5">
            Audience
          </p>
          <p className="text-sm text-gray-600 leading-relaxed">
            {audienceSummary}
          </p>
        </div>

        <div>
          <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-400 mb-1.5">
            Content Style
          </p>
          <p className="text-sm text-gray-600 leading-relaxed">
            {contentStyle}
          </p>
        </div>

        <div>
          <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-400 mb-2">
            Past Brand Deals
          </p>
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
  );
}
