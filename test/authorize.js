import should from "should";
import { authorize } from "../src/index.js";

/** @typedef {import("../src/authorize.js").Authorization} Authorization */

describe("authorize", () => {
  /**
   * @param {string} title
   * @param {Authorization} auth
   * @param {string} value
   */
  function itShouldPass(title, auth, value) {
    it(`should pass ${title}`, () => {
      should(authorize(auth).call({ method: "DELETE" }))
        .has.properties({ method: "DELETE" })
        .and.has.property("headers")
        .match((headers) => {
          should(headers.get("authorization")).eql(value);
        });
    });
  }

  itShouldPass(
    "basic authorization",
    { username: "foo", password: "bar" },
    `Basic Zm9vOmJhcg==`
  );
  itShouldPass("bearer authorization", { bearer: "foo" }, "Bearer foo");
  itShouldPass("token authorization", { token: "foo" }, "Token foo");

  it("should throw unknown authorization", () => {
    should(() => authorize(/** @type {Authorization} */ ({}))).throwError(
      "Unknown authorization pattern."
    );
  });

  it("should respect authorization in request", () => {
    should(
      authorize({ token: "foo" }).call({
        headers: {
          authorization: "Bearer baz",
        },
      })
    )
      .has.property("headers")
      .match((headers) => {
        should(headers.get("authorization")).eql("Bearer baz");
      });
  });
});
