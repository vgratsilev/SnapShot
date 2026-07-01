import { beforeEach, describe, expect, it, vi } from "vitest";
import { fetchPhotos } from "../api/flickr";
import { loadPhotos } from "./loadPhotos";

vi.mock("../api/flickr", () => ({
  fetchPhotos: vi.fn()
}));

const fetchPhotosMock = vi.mocked(fetchPhotos);

beforeEach(() => {
  fetchPhotosMock.mockReset();
});

describe("loadPhotos", () => {
  it("reuses cached photos for the same trimmed query", async () => {
    const photos = [
      {
        id: "1",
        secret: "secret",
        server: "server",
        title: "Cached photo"
      }
    ];
    fetchPhotosMock.mockResolvedValue(photos);

    await loadPhotos(" cache-hit-test ");
    const secondResult = await loadPhotos("cache-hit-test");

    expect(fetchPhotosMock).toHaveBeenCalledTimes(1);
    expect(secondResult).toEqual({
      query: "cache-hit-test",
      photos
    });
  });
});
