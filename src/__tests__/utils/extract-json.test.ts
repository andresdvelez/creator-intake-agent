import { describe, it, expect } from "bun:test";
import { extractJson } from "@/utils/extract-json";

describe("extractJson", () => {
  it("returns plain JSON object unchanged", () => {
    const input = '{"foo":"bar","num":42}';
    expect(extractJson(input)).toBe(input);
  });

  it("strips triple-backtick json fences", () => {
    const input = '```json\n{"foo":"bar"}\n```';
    expect(extractJson(input)).toBe('{"foo":"bar"}');
  });

  it("strips triple-backtick fences without language hint", () => {
    const input = '```\n{"foo":"bar"}\n```';
    expect(extractJson(input)).toBe('{"foo":"bar"}');
  });

  it("extracts object from text with preamble", () => {
    const input =
      'Sure, here is the result:\n{"fitScore":8,"recommendation":"approve"}';
    expect(extractJson(input)).toBe(
      '{"fitScore":8,"recommendation":"approve"}',
    );
  });

  it("handles model thinking/preamble before JSON", () => {
    const input =
      'Let me evaluate this creator {mental note}...\n{"fitScore":7,"reasoning":"good"}';
    const result = extractJson(input);
    expect(result).toBe('{"fitScore":7,"reasoning":"good"}');
  });

  it("handles nested objects", () => {
    const input = '{"outer":{"inner":"val"}}';
    expect(extractJson(input)).toBe(input);
  });

  it("trims surrounding whitespace", () => {
    const input = '  {"foo":"bar"}  ';
    expect(extractJson(input)).toBe('{"foo":"bar"}');
  });

  it("returns empty string when input is empty", () => {
    expect(extractJson("")).toBe("");
  });

  it("returns trimmed input when no JSON object found", () => {
    const input = "  just some text  ";
    expect(extractJson(input)).toBe("just some text");
  });

  it("handles JSON with arrays in values", () => {
    const input = '{"risks":["low","medium"],"missingInfo":[]}';
    expect(extractJson(input)).toBe(input);
  });
});
