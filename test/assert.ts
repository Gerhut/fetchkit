import should from "should";
import { assert } from "../src";

describe("assert", () => {
  for (const status of [200, 204]) {
    it(`should pass the HTTP ${status} response`, () => {
      const response = new Response(null, { status });
      should(() => assert(response)).not.throw();
    });
  }

  for (const status of [300, 302, 400, 404, 500, 502]) {
    it(`should fail the HTTP ${status} response`, () => {
      const response = new Response(null, { status });
      should(() => assert(response)).throw({
        name: "HttpError",
        message: `HTTP ${status}`,
        response,
      });
    });
  }
});
