import type { Campaign, Creator } from '@/types'

interface ApplicationSectionProps {
  creator: Creator
  campaign: Campaign
}

export function ApplicationSection({ creator, campaign }: ApplicationSectionProps) {
  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">
          Application Message
        </h3>
        <blockquote className="border-l-2 border-[#ff5a00] pl-3 py-1">
          <p className="text-sm text-gray-800 leading-relaxed italic">
            &ldquo;{creator.applicationMessage}&rdquo;
          </p>
        </blockquote>
      </div>

      <div className="bg-gray-50 rounded-lg p-3.5 space-y-2.5">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-400">
            Campaign
          </h3>
          <span className="text-xs font-medium text-[#ff5a00]">{campaign.brandName}</span>
        </div>
        <p className="text-xs text-gray-600 leading-relaxed">{campaign.campaignGoal}</p>
        <div className="flex flex-wrap gap-1.5">
          {campaign.platforms.map((p) => (
            <span
              key={p}
              className="px-2 py-0.5 rounded text-xs font-medium bg-white border border-gray-200 text-gray-600"
            >
              {p}
            </span>
          ))}
          <span className="px-2 py-0.5 rounded text-xs font-medium bg-white border border-gray-200 text-gray-600">
            {campaign.budgetRange}
          </span>
        </div>
      </div>
    </div>
  )
}
