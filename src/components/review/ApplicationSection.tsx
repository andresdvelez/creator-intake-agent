import type { Campaign, Creator } from '@/types'

interface ApplicationSectionProps {
  creator: Creator
  campaign: Campaign
}

export function ApplicationSection({ creator, campaign }: ApplicationSectionProps) {
  return (
    <div className="space-y-4" data-tour="application-section">
      <div>
        <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-400 mb-2.5">
          Application Message
        </p>
        <div className="bg-gray-50 rounded-2xl px-4 py-3.5 ring-1 ring-black/[0.03]">
          <p className="text-sm text-gray-700 leading-relaxed italic">
            &ldquo;{creator.applicationMessage}&rdquo;
          </p>
        </div>
      </div>

      <div className="bg-gray-50 rounded-2xl p-4 ring-1 ring-black/[0.03] space-y-3">
        <div className="flex items-center justify-between">
          <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-400">Campaign</p>
          <span className="text-xs font-semibold text-[#ff5a00]">{campaign.brandName}</span>
        </div>
        <p className="text-xs text-gray-500 leading-relaxed">{campaign.campaignGoal}</p>
        <div className="flex flex-wrap gap-1.5">
          {campaign.platforms.map((p) => (
            <span
              key={p}
              className="px-2.5 py-1 rounded-full text-xs font-medium bg-white ring-1 ring-black/[0.06] text-gray-500"
            >
              {p}
            </span>
          ))}
          <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-white ring-1 ring-black/[0.06] text-gray-500">
            {campaign.budgetRange}
          </span>
        </div>
      </div>
    </div>
  )
}
