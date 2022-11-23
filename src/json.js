/**
 * @this {IsomorphicRequestInit | void}
 * @param {unknown} payload
 * @returns {IsomorphicRequestInit}
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
