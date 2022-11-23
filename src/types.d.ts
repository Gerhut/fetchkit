declare type BasicAuthorization = {
  username: string;
  password: string;
};

declare type BearerAuthorization = {
  bearer: string;
};

declare type TokenAuthorization = {
  token: string;
};

declare type Authorization =
  | BasicAuthorization
  | BearerAuthorization
  | TokenAuthorization;

type IsomorphicHeadersInit = HeadersInit | import("node-fetch").HeadersInit;
type IsomorphicRequestInit = RequestInit | import("node-fetch").RequestInit;
type IsomorphicResponse = Response | import("node-fetch").Response;
