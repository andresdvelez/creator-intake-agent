import { describe, it, expect } from "bun:test";
import { render, screen } from "@testing-library/react";
import { AiReviewCard } from "@/components/review/AiReviewCard";
import type { AiReviewResult } from "@/types";

const baseReview: AiReviewResult = {
  fitScore: 8,
  recommendation: "approve",
  reasoning: "Creator aligns well with campaign goals and audience.",
  risks: ["Potential overlap with competitor brands"],
  missingInfo: ["Media kit required"],
  suggestedReply: "Thank you for applying! We would love to work with you.",
};

describe("AiReviewCard", () => {
  it("renders the AI Review header", () => {
    render(<AiReviewCard review={baseReview} />);
    expect(screen.getByText("AI Review")).toBeInTheDocument();
  });

  it("displays the fit score", () => {
    render(<AiReviewCard review={baseReview} />);
    expect(screen.getByText("8")).toBeInTheDocument();
  });

  it("shows the recommendation badge label", () => {
    render(<AiReviewCard review={baseReview} />);
    expect(screen.getByText("Approve")).toBeInTheDocument();
  });

  it('shows "Reject" badge for reject recommendation', () => {
    render(
      <AiReviewCard review={{ ...baseReview, recommendation: "reject" }} />,
    );
    expect(screen.getByText("Reject")).toBeInTheDocument();
  });

  it('shows "Needs Info" badge for needs_info recommendation', () => {
    render(
      <AiReviewCard review={{ ...baseReview, recommendation: "needs_info" }} />,
    );
    expect(screen.getByText("Needs Info")).toBeInTheDocument();
  });

  it('shows "Manual Review" badge for manual_review recommendation', () => {
    render(
      <AiReviewCard
        review={{ ...baseReview, recommendation: "manual_review" }}
      />,
    );
    expect(screen.getByText("Manual Review")).toBeInTheDocument();
  });

  it("displays the reasoning text", () => {
    render(<AiReviewCard review={baseReview} />);
    expect(
      screen.getByText("Creator aligns well with campaign goals and audience."),
    ).toBeInTheDocument();
  });

  it("renders risks items", () => {
    render(<AiReviewCard review={baseReview} />);
    expect(
      screen.getByText("Potential overlap with competitor brands"),
    ).toBeInTheDocument();
  });

  it("renders missingInfo items", () => {
    render(<AiReviewCard review={baseReview} />);
    expect(screen.getByText("Media kit required")).toBeInTheDocument();
  });

  it("renders the suggestedReply", () => {
    render(<AiReviewCard review={baseReview} />);
    expect(
      screen.getByText(
        "Thank you for applying! We would love to work with you.",
      ),
    ).toBeInTheDocument();
  });

  it("hides Risks section when risks array is empty", () => {
    render(<AiReviewCard review={{ ...baseReview, risks: [] }} />);
    expect(screen.queryByText("Risks")).not.toBeInTheDocument();
  });

  it("hides Missing Info section when missingInfo array is empty", () => {
    render(<AiReviewCard review={{ ...baseReview, missingInfo: [] }} />);
    expect(screen.queryByText("Missing Info")).not.toBeInTheDocument();
  });
});
