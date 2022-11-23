import nodeFetch from "node-fetch";
import { json, assert, authorize } from "../src/index.js";

async function _() {
  const response = await fetch(
    "http://example.com/",
    json.call({ method: "PUT" }, { foo: "bar" })
  );
  assert(response);
  fetch(
    "http://example.com/",
    authorize.call({ method: "PUT" }, { token: "foo" })
  );
}
