/**
 * @this {RequestInit | void}
 * @param {unknown} payload
 * @returns {RequestInit}
 */
export function json(payload) {
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
