import { CAMPAIGN } from '@/lib/data/campaign'

export function Header() {
  return (
    <header className="shrink-0 bg-white rounded-2xl shadow-sm ring-1 ring-black/[0.04] px-4 py-2.5 sm:px-5 sm:py-3 flex items-center justify-between">
      <div className="flex items-center gap-2.5 sm:gap-3">
        <span className="text-sm sm:text-base font-bold tracking-tight text-[#ff5a00]">influur</span>
        <div className="h-4 w-px bg-gray-200" />
        <span className="text-xs sm:text-sm font-medium text-gray-400">Creator Intake</span>
      </div>

      <div className="hidden sm:flex items-center gap-2 bg-gray-50 rounded-full px-3.5 sm:px-4 py-1.5 ring-1 ring-black/[0.04]">
        <div className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
        <span className="text-xs font-semibold text-gray-700 truncate max-w-[140px]">
          {CAMPAIGN.campaignName}
        </span>
        <span className="text-xs text-gray-400 hidden md:inline">{CAMPAIGN.brandName}</span>
      </div>

      <div className="flex sm:hidden items-center gap-1.5 bg-gray-50 rounded-full px-2.5 py-1 ring-1 ring-black/[0.04]">
        <div className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
        <span className="text-[10px] font-semibold text-gray-600">{CAMPAIGN.brandName}</span>
      </div>
    </header>
  )
}
