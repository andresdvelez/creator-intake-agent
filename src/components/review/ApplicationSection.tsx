import type { Campaign, Creator } from '@/types'

interface ApplicationSectionProps {
  creator: Creator
  campaign: Campaign
}

export function ApplicationSection({ creator, campaign }: ApplicationSectionProps) {
  return (
    <div className="space-y-4" data-tour="application-section">

      {/* Creator application message */}
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

      {/* Campaign context */}
      <div className="bg-gray-50 rounded-2xl p-4 ring-1 ring-black/[0.03] space-y-3.5">
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

        {/* Requirements checklist */}
        <div className="pt-0.5 border-t border-gray-100">
          <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-400 mb-2 mt-2.5">
            Requirements to Verify
          </p>
          <ul className="space-y-1.5">
            {campaign.requirements.map((req) => (
              <li key={req} className="flex items-start gap-2">
                <div className="mt-[3px] h-3.5 w-3.5 rounded-full ring-1 ring-gray-200 bg-white shrink-0 flex items-center justify-center">
                  <div className="h-1 w-1 rounded-full bg-gray-300" />
                </div>
                <span className="text-xs text-gray-500 leading-snug">{req}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
