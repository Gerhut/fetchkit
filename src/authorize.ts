import { base64 } from "./base64";

export type Authorization =
  | {
      username: string;
      password: string;
    }
  | {
      bearer: string;
    }
  | {
      token: string;
    };

function encode(auth: Authorization) {
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

export function authorize(auth: Authorization) {
  const authorization = encode(auth);

  return function authorized(this: RequestInit | void): RequestInit {
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
