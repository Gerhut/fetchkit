class HttpError extends Error {
  /** @readonly */
  name = 'HttpError'

  /**
   * @param {Response} response
   */
  constructor(response) {
    super(`HTTP ${response.status}`)
    /** @readonly */
    this.response = response
  }
}

/**
 * @param {Response} response
 */
export function assert(response) {
  if (!response.ok) {
    throw new HttpError(response);
  }
}
