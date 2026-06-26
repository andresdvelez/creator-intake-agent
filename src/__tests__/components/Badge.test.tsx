import { describe, it, expect } from "bun:test";
import { render, screen } from "@testing-library/react";
import { Badge } from "@/components/ui/Badge";

describe("Badge", () => {
  it("renders children text", () => {
    render(<Badge variant="pending">Pending</Badge>);
    expect(screen.getByText("Pending")).toBeInTheDocument();
  });

  it("renders all variant labels without throwing", () => {
    const variants = [
      "pending",
      "approved",
      "rejected",
      "needs_info",
      "manual_review",
    ] as const;
    for (const variant of variants) {
      const { unmount } = render(<Badge variant={variant}>{variant}</Badge>);
      expect(screen.getByText(variant)).toBeInTheDocument();
      unmount();
    }
  });

  it("renders with sm size by default", () => {
    const { container } = render(<Badge variant="pending">Label</Badge>);
    const span = container.querySelector("span");
    expect(span?.className).toContain("px-2");
  });

  it("renders with md size when specified", () => {
    const { container } = render(
      <Badge variant="approved" size="md">
        Label
      </Badge>,
    );
    const span = container.querySelector("span");
    expect(span?.className).toContain("px-2.5");
  });

  it("approved variant has green styling", () => {
    const { container } = render(<Badge variant="approved">Approved</Badge>);
    expect(container.querySelector("span")?.className).toContain("green");
  });

  it("rejected variant has red styling", () => {
    const { container } = render(<Badge variant="rejected">Rejected</Badge>);
    expect(container.querySelector("span")?.className).toContain("red");
  });
});
