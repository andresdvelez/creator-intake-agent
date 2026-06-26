export interface TourStep {
  target: string;
  title: string;
  body: string;
  placement: "right" | "bottom" | "top" | "left";
}

export const TOUR_STEPS: TourStep[] = [
  {
    target: '[data-tour="creator-list"]',
    title: "Creator Applications",
    body: "All incoming creator applications are listed here. Each card shows their current status, platform, and follower count. Click any creator to open their profile.",
    placement: "right",
  },
  {
    target: '[data-tour="creator-profile"]',
    title: "Creator Profile",
    body: "Review the creator's key metrics — followers, engagement rate, audience demographics, content style, and past brand partnerships — all in one place.",
    placement: "bottom",
  },
  {
    target: '[data-tour="application-section"]',
    title: "Application & Campaign Fit",
    body: "Read the creator's pitch for this campaign and quickly compare it against the campaign goal and platform requirements.",
    placement: "bottom",
  },
  {
    target: '[data-tour="run-review"]',
    title: "AI-Powered Analysis",
    body: 'Click "Run AI Review" to get an instant fit score (0–10), flagged risks, missing information, and a ready-to-send reply draft — grounded strictly in the provided data.',
    placement: "top",
  },
  {
    target: '[data-tour="decision-buttons"]',
    title: "Make Your Decision",
    body: "After reviewing the AI analysis, approve the creator, request more information, or reject — directly from this panel.",
    placement: "top",
  },
];
