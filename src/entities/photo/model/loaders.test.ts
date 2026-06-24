import type { LoaderFunctionArgs } from "react-router-dom";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { loadPhotos } from "./loadPhotos";
import { createCategoryLoader, searchLoader } from "./loaders";

vi.mock("./loadPhotos", () => ({
  loadPhotos: vi.fn()
}));

const loadPhotosMock = vi.mocked(loadPhotos);

const createLoaderArgs = (
  params: LoaderFunctionArgs["params"] = {}
): LoaderFunctionArgs => {
  const url = new URL("https://example.test/SnapShot/");

  return {
    params,
    request: new Request(url),
    url,
    pattern: "/search/:searchInput",
    context: undefined
  };
};

beforeEach(() => {
  loadPhotosMock.mockResolvedValue({ query: "", photos: [] });
});

describe("photo route loaders", () => {
  it("loads the static category term instead of an empty route param", async () => {
    const loader = createCategoryLoader("mountain");
    const args = createLoaderArgs();

    await loader(args);

    expect(loadPhotosMock).toHaveBeenCalledWith(
      "mountain",
      args.request.signal
    );
  });

  it("passes search params through without double-decoding", async () => {
    const args = createLoaderArgs({ searchInput: "%" });

    await searchLoader(args);

    expect(loadPhotosMock).toHaveBeenCalledWith("%", args.request.signal);
  });
});
