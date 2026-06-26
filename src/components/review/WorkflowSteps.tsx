import type { CreatorStatus } from "@/types";

interface WorkflowStepsProps {
  hasAiReview: boolean;
  isReviewing: boolean;
  currentStatus: CreatorStatus;
}

type StepState = "done" | "active" | "pending";

const DOT: Record<StepState, string> = {
  done: "bg-[#ff5a00]",
  active: "bg-[#ff5a00] animate-pulse",
  pending: "bg-gray-200",
};

const LABEL: Record<StepState, string> = {
  done: "text-gray-500",
  active: "text-[#ff5a00] font-semibold",
  pending: "text-gray-300",
};

const CONNECTOR: Record<"lit" | "dim", string> = {
  lit: "bg-[#ff5a00]/30",
  dim: "bg-gray-100",
};

export function WorkflowSteps({
  hasAiReview,
  isReviewing,
  currentStatus,
}: WorkflowStepsProps) {
  const s1: StepState = "done";
  const s2: StepState = isReviewing
    ? "active"
    : hasAiReview
      ? "done"
      : "pending";
  const s3: StepState =
    currentStatus !== "pending" ? "done" : hasAiReview ? "active" : "pending";

  return (
    <div className="flex items-center gap-1.5 mt-1.5">
      <div className={`h-1.5 w-1.5 rounded-full shrink-0 ${DOT[s1]}`} />
      <span className={`text-[10px] ${LABEL[s1]}`}>Profile</span>

      <div
        className={`h-px w-5 ${CONNECTOR[s2 === "pending" ? "dim" : "lit"]}`}
      />

      <div className={`h-1.5 w-1.5 rounded-full shrink-0 ${DOT[s2]}`} />
      <span className={`text-[10px] ${LABEL[s2]}`}>AI Review</span>

      <div
        className={`h-px w-5 ${CONNECTOR[s3 === "pending" ? "dim" : "lit"]}`}
      />

      <div className={`h-1.5 w-1.5 rounded-full shrink-0 ${DOT[s3]}`} />
      <span className={`text-[10px] ${LABEL[s3]}`}>Decision</span>
    </div>
  );
}
