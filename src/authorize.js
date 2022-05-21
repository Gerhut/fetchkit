const base64 = (() => {
  if (typeof btoa === "function") {
    return (/** @type {string} */ data) => btoa(data);
  }
  if (typeof Buffer === "function") {
    return (/** @type {string} */ data) => Buffer.from(data).toString("base64");
  }
  throw new Error("Unable to base64");
})();

/**
 * @typedef {object} BasicAuthorization
 * @property {string} username
 * @property {string} password
 */
/**
 * @typedef {object} BearerAuthorization
 * @property {string} bearer
 */
/**
 * @typedef {object} TokenAuthorization
 * @property {string} token
 */
/**
 * @typedef {BasicAuthorization | BearerAuthorization | TokenAuthorization} Authorization
 */

/**
 * @param {Authorization} auth
 */
function encode(auth) {
  if ("username" in auth) {
    const { username, password } = auth;
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
 * @param {Authorization} auth
 */
export function authorize(auth) {
  const authorization = encode(auth);

  /**
   * @this {RequestInit | void}
   * @returns {RequestInit}
   */
  return function authorized() {
    const { headers: headersInit, ...init } = this ?? {};
    const headers = new Headers(headersInit);
    if (!headers.has("Authorization")) {
      headers.set("Authorization", authorization);
    }
    return {
      headers,
      ...init,
    };
  };
}
