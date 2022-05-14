export function json(this: RequestInit | void, payload: unknown): RequestInit {
  const { headers: headersInit, ...init } = this ?? {};
  const headers = new Headers(headersInit);
  if (!headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }
  return {
    method: "POST",
    headers,
    body: JSON.stringify(payload),
    ...init,
  };
}
