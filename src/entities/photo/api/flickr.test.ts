import { beforeEach, describe, expect, it, vi } from "vitest";
import { getJson } from "@/shared/api";
import { fetchPhotos } from "./flickr";

vi.mock("@/shared/config", () => ({
  FLICKR_API_KEY: "test-key"
}));

vi.mock("@/shared/api", () => ({
  getJson: vi.fn()
}));

const getJsonMock = vi.mocked(getJson);

beforeEach(() => {
  getJsonMock.mockReset();
});

describe("fetchPhotos", () => {
  it("uses relevance text search instead of broad tag search", async () => {
    getJsonMock.mockResolvedValue({
      stat: "ok",
      photos: { photo: [] }
    });

    await fetchPhotos("mountain");

    const url = getJsonMock.mock.calls.at(0)?.[0] ?? "";
    const params = new URL(url).searchParams;

    expect(params.get("text")).toBe("mountain");
    expect(params.get("sort")).toBe("relevance");
    expect(params.get("safe_search")).toBe("1");
    expect(params.get("tags")).toBeNull();
  });

  it("throws Flickr API failure messages instead of returning empty results", async () => {
    getJsonMock.mockResolvedValue({
      stat: "fail",
      message: "Invalid API Key"
    });

    await expect(fetchPhotos("mountain")).rejects.toThrow("Invalid API Key");
  });

  it("rejects malformed photo items from Flickr", async () => {
    getJsonMock.mockResolvedValue({
      stat: "ok",
      photos: { photo: [{ id: "missing-required-fields" }] }
    });

    await expect(fetchPhotos("mountain")).rejects.toThrow("invalid photo item");
  });
});
