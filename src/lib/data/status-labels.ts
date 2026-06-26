import type { CreatorStatus } from "@/types";

export const STATUS_LABEL: Record<CreatorStatus, string> = {
  pending: "Pending",
  approved: "Approved",
  rejected: "Rejected",
  needs_info: "Needs Info",
};
