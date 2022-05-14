interface HttpError extends Error {
  response: Response;
}

function createError(response: Response) {
  const error: HttpError = Object.assign(new Error(`HTTP ${response.status}`), {
    response,
  });
  error.name = "HttpError";

  return error;
}

export function assert(response: Response) {
  if (!response.ok) {
    throw createError(response);
  }
}
