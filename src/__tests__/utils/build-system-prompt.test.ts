import { describe, it, expect } from "bun:test";
import { buildSystemPrompt } from "@/utils/build-system-prompt";

describe("buildSystemPrompt", () => {
  it("returns a non-empty string", () => {
    const prompt = buildSystemPrompt();
    expect(typeof prompt).toBe("string");
    expect(prompt.length).toBeGreaterThan(0);
  });

  it("instructs the model to return JSON only", () => {
    const prompt = buildSystemPrompt();
    expect(prompt.toLowerCase()).toContain("json");
  });

  it("instructs to evaluate based on provided data only", () => {
    const prompt = buildSystemPrompt();
    expect(prompt.toLowerCase()).toContain("provided");
  });
});
