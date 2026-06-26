import type { Campaign, Creator } from "@/types";
import { Badge } from "@/components/ui/Badge";
import { STATUS_LABEL } from "@/lib/data/status-labels";
import { getInitials } from "@/utils/get-name-initials";
import { AiReviewCard } from "./AiReviewCard";
import { AiReviewPlaceholder } from "./AiReviewPlaceholder";
import { ApplicationSection } from "./ApplicationSection";
import { CreatorProfile } from "./CreatorProfile";
import { DecisionSection } from "./DecisionSection";
import { RunReviewSection } from "./RunReviewSection";
import { WorkflowSteps } from "./WorkflowSteps";

interface ReviewPanelProps {
  creator: Creator;
  campaign: Campaign;
  isReviewing: boolean;
  reviewError: string | null;
  onRunReview: () => void;
  onApprove: () => void;
  onReject: () => void;
  onNeedsInfo: () => void;
}

export function ReviewPanel({
  creator,
  campaign,
  isReviewing,
  reviewError,
  onRunReview,
  onApprove,
  onReject,
  onNeedsInfo,
}: ReviewPanelProps) {
  const hasAiReview = creator.aiReview !== undefined;

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden bg-white rounded-2xl shadow-sm ring-1 ring-black/[0.04]">
      {/* Header — avatar + identity + workflow progress */}
      <div className="px-4 py-3.5 sm:px-6 sm:py-4 shrink-0 flex items-start justify-between gap-4 border-b border-gray-50">
        <div className="flex items-start gap-3 min-w-0">
          <div className="h-9 w-9 rounded-full bg-[#ff5a00] text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
            {getInitials(creator.creatorName)}
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="text-sm sm:text-base font-semibold text-gray-900">
                {creator.creatorName}
              </h2>
              <span className="text-gray-200">·</span>
              <span className="text-xs text-gray-400">{creator.handle}</span>
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium bg-gray-100 text-gray-500">
                {creator.platform}
              </span>
            </div>
            <WorkflowSteps
              hasAiReview={hasAiReview}
              isReviewing={isReviewing}
              currentStatus={creator.status}
            />
          </div>
        </div>
        <Badge variant={creator.status} size="md">
          {STATUS_LABEL[creator.status]}
        </Badge>
      </div>

      {/* Scrollable review content */}
      <div className="flex-1 overflow-y-auto min-h-0">
        <div className="px-4 py-4 sm:px-6 sm:py-5">
          <CreatorProfile creator={creator} />
        </div>

        <div className="border-t border-gray-50 px-4 py-4 sm:px-6 sm:py-5">
          <ApplicationSection creator={creator} campaign={campaign} />
        </div>

        <div className="border-t border-gray-50 px-4 py-4 sm:px-6 sm:py-5">
          <RunReviewSection
            isReviewing={isReviewing}
            hasAiReview={hasAiReview}
            reviewError={reviewError}
            onRunReview={onRunReview}
          />
        </div>

        {isReviewing && (
          <div className="border-t border-gray-50 flex items-center justify-center gap-3 py-10">
            <svg
              className="h-5 w-5 animate-spin text-[#ff5a00]"
              fill="none"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
              />
            </svg>
            <span className="text-sm text-gray-400">Running AI analysis…</span>
          </div>
        )}

        {!isReviewing && (
          <div className="border-t border-gray-50 px-4 py-4 sm:px-6 sm:py-5 pb-6">
            {creator.aiReview !== undefined ? (
              <AiReviewCard review={creator.aiReview} />
            ) : (
              <AiReviewPlaceholder />
            )}
          </div>
        )}
      </div>

      {/* Sticky decision footer — always visible */}
      <div className="shrink-0 border-t border-gray-100 bg-white px-4 py-3 sm:px-6 sm:py-3.5">
        <div className="flex items-center justify-between mb-2.5">
          <span className="text-[10px] font-semibold uppercase tracking-widest text-gray-400">
            Your Decision
          </span>
          {creator.status !== "pending" && (
            <span className="text-[10px] text-gray-400">
              Decision recorded — you can change it anytime
            </span>
          )}
        </div>
        <DecisionSection
          currentStatus={creator.status}
          onApprove={onApprove}
          onReject={onReject}
          onNeedsInfo={onNeedsInfo}
        />
      </div>
    </div>
  );
}
