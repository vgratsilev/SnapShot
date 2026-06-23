/**
 * Thin typed wrapper around the Fetch API.
 *
 * Keeps `entities/photo` free of HTTP plumbing and makes JSON requests
 * consistent: it parses JSON, surfaces non-2xx responses as errors, and
 * preserves the parsed body on the error for callers that want it.
 */
export class ApiError extends Error {
  readonly status: number;
  readonly body: unknown;

  constructor(message: string, status: number, body: unknown) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.body = body;
  }
}

export interface GetJsonOptions {
  readonly signal?: AbortSignal;
}

export async function getJson<T>(
  url: string,
  options: GetJsonOptions = {}
): Promise<T> {
  const response = await fetch(url, {
    method: "GET",
    headers: { Accept: "application/json" },
    signal: options.signal
  });

  const body = (await response.json().catch(() => undefined)) as T;

  if (!response.ok) {
    throw new ApiError(
      `Request failed with status ${response.status}`,
      response.status,
      body
    );
  }

  return body;
}
