import { base64 } from "./utils/base64.js";

/**
 * @param {Authorization} auth
 */
function encode(auth) {
  if ("username" in auth || "password" in auth) {
    const { username = "", password = "" } = auth;
    return `Basic ${base64(`${username}:${password}`)}`;
  }
  if ("bearer" in auth) {
    return `Bearer ${auth.bearer}`;
  }
  if ("token" in auth) {
    return `Token ${auth.token}`;
  }
  throw new Error("Unknown authorization pattern.");
}

/**
 * @this {IsomorphicRequestInit | void}
 * @param {Authorization} auth
 * @returns {IsomorphicRequestInit}
 */
export function authorize(auth) {
  const { headers: headersInit, ...init } = this ?? {};
  const headers = new Headers(headersInit);
  if (!headers.has("Authorization")) {
    const authorization = encode(auth);
    headers.set("Authorization", authorization);
  }
  return {
    headers,
    ...init,
  };
}
