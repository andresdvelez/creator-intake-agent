import { CAMPAIGN } from "@/lib/data/campaign";

export const Header = () => {
  return (
    <header className="shrink-0 bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between">
      <div className="flex items-center gap-2.5">
        <span className="text-lg font-bold tracking-tight text-[#ff5a00]">
          influur
        </span>
        <span className="text-gray-300">|</span>
        <span className="text-sm font-medium text-gray-600">
          Creator Intake
        </span>
      </div>

      <div className="flex items-center gap-2">
        <div className="h-2 w-2 rounded-full bg-green-400" />
        <span className="text-sm font-medium text-gray-700">
          {CAMPAIGN.campaignName}
        </span>
        <span className="ml-1 text-xs text-gray-400">{CAMPAIGN.brandName}</span>
      </div>
    </header>
  );
};
