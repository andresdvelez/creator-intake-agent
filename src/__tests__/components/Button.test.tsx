import { describe, it, expect, mock } from "bun:test";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Button } from "@/components/ui/Button";

describe("Button", () => {
  it("renders children", () => {
    render(<Button>Click me</Button>);
    expect(
      screen.getByRole("button", { name: "Click me" }),
    ).toBeInTheDocument();
  });

  it('shows loading spinner and "Analyzing…" when isLoading', () => {
    render(<Button isLoading>Run AI</Button>);
    expect(screen.getByText("Analyzing…")).toBeInTheDocument();
    expect(screen.queryByText("Run AI")).not.toBeInTheDocument();
  });

  it("is disabled when isLoading is true", () => {
    render(<Button isLoading>Run AI</Button>);
    expect(screen.getByRole("button")).toBeDisabled();
  });

  it("is disabled when disabled prop is true", () => {
    render(<Button disabled>Run AI</Button>);
    expect(screen.getByRole("button")).toBeDisabled();
  });

  it("calls onClick when clicked", async () => {
    const onClick = mock(() => {});
    render(<Button onClick={onClick}>Click</Button>);
    await userEvent.click(screen.getByRole("button"));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("does not call onClick when disabled", async () => {
    const onClick = mock(() => {});
    render(
      <Button disabled onClick={onClick}>
        Click
      </Button>,
    );
    await userEvent.click(screen.getByRole("button"));
    expect(onClick).not.toHaveBeenCalled();
  });

  it("applies primary variant classes", () => {
    const { container } = render(<Button variant="primary">Primary</Button>);
    expect(container.querySelector("button")?.className).toContain(
      "bg-[#ff5a00]",
    );
  });

  it("applies danger variant classes", () => {
    const { container } = render(<Button variant="danger">Danger</Button>);
    expect(container.querySelector("button")?.className).toContain("red");
  });

  it("applies additional className", () => {
    const { container } = render(<Button className="custom-class">Btn</Button>);
    expect(container.querySelector("button")?.className).toContain(
      "custom-class",
    );
  });
});
