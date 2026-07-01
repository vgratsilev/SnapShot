import { describe, expect, it } from "vitest";
import { Cache } from "./cache";

describe("Cache", () => {
  it("returns cached values before they expire", () => {
    const cache = new Cache<string, number>({
      maxEntries: 2,
      ttlMs: 100,
      now: () => 0
    });

    cache.set("first", 1);

    expect(cache.get("first")).toBe(1);
  });

  it("drops expired values", () => {
    let now = 0;
    const cache = new Cache<string, number>({
      maxEntries: 2,
      ttlMs: 100,
      now: () => now
    });

    cache.set("first", 1);
    now = 101;

    expect(cache.get("first")).toBeUndefined();
  });

  it("evicts the oldest key when max entries is exceeded", () => {
    const cache = new Cache<string, number>({
      maxEntries: 2,
      ttlMs: 100,
      now: () => 0
    });

    cache.set("first", 1);
    cache.set("second", 2);
    cache.set("third", 3);

    expect(cache.get("first")).toBeUndefined();
    expect(cache.get("second")).toBe(2);
    expect(cache.get("third")).toBe(3);
  });
});
