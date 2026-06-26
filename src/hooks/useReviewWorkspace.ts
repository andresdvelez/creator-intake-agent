"use client";

import { useMemo, useState } from "react";
import { sileo } from "sileo";

import type { AiReviewResult, Creator, CreatorStatus } from "@/types";
import { runCreatorReview } from "@/lib/actions/review";
import { CREATORS } from "@/lib/data/creators";

interface UseReviewWorkspaceReturn {
  creators: Creator[];
  selectedId: string;
  selectedCreator: Creator | null;
  isReviewing: boolean;
  reviewError: string | null;
  setSelectedId: (id: string) => void;
  handleRunReview: () => Promise<void>;
  handleApprove: () => void;
  handleReject: () => void;
  handleNeedsInfo: () => void;
}

export function useReviewWorkspace(): UseReviewWorkspaceReturn {
  const [creators, setCreators] = useState<Creator[]>(CREATORS);
  const [selectedId, setSelectedId] = useState<string>(CREATORS[0]?.id ?? "");
  const [isReviewing, setIsReviewing] = useState(false);
  const [reviewError, setReviewError] = useState<string | null>(null);

  const selectedCreator = useMemo(
    () => creators.find((c) => c.id === selectedId) ?? null,
    [creators, selectedId],
  );

  function updateStatus(id: string, status: CreatorStatus) {
    setCreators((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status } : c)),
    );
  }

  function applyAiReview(id: string, aiReview: AiReviewResult) {
    setCreators((prev) =>
      prev.map((c) => (c.id === id ? { ...c, aiReview } : c)),
    );
  }

  async function handleRunReview() {
    if (!selectedId) return;
    const capturedId = selectedId;
    setIsReviewing(true);
    setReviewError(null);

    try {
      const data = await sileo.promise(
        runCreatorReview(capturedId).then((result) => {
          if (!result.success) throw new Error(result.error);
          return result.data;
        }),
        {
          loading: { title: "Running AI review…" },
          success: (d) => ({
            title: "Review complete",
            description: `Fit score: ${d.fitScore}/10`,
          }),
          error: (err) => ({
            title: "Review failed",
            description:
              err instanceof Error ? err.message : "Please try again",
          }),
        },
      );
      applyAiReview(capturedId, data);
    } catch (err) {
      setReviewError(
        err instanceof Error
          ? err.message
          : "An unexpected error occurred — please try again",
      );
    } finally {
      setIsReviewing(false);
    }
  }

  function handleApprove() {
    if (!selectedId) return;
    updateStatus(selectedId, "approved");
    sileo.success({ title: "Creator approved" });
  }

  function handleReject() {
    if (!selectedId) return;
    updateStatus(selectedId, "rejected");
    sileo.error({ title: "Creator rejected" });
  }

  function handleNeedsInfo() {
    if (!selectedId) return;
    updateStatus(selectedId, "needs_info");
    sileo.warning({ title: "More information requested" });
  }

  return {
    creators,
    selectedId,
    selectedCreator,
    isReviewing,
    reviewError,
    setSelectedId,
    handleRunReview,
    handleApprove,
    handleReject,
    handleNeedsInfo,
  };
}
