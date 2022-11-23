class HttpError extends Error {
  /** @readonly */
  name = "HttpError";

  /**
   * @param {IsomorphicResponse} response
   */
  constructor(response) {
    super(`HTTP ${response.status}`);
    /** @readonly */
    this.response = response;
  }
}

/**
 * @param {IsomorphicResponse} response
 */
export function assert(response) {
  if (!response.ok) {
    throw new HttpError(response);
  }
}
