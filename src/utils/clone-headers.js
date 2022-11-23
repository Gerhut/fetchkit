/**
 * @param {IsomorphicHeadersInit} headers
 * @return {IsomorphicHeadersInit}
 */
export function cloneHeaders(headers) {
  if (Array.isArray(headers)) {
    return [...headers]
  } else if (typeof headers[Symbol.iterator] === 'function') {
    return {...headers}
  } else {
    return new headers.constructor(headers)
  }
}
