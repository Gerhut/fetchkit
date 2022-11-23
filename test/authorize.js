import should from "should";
import { authorize } from "../src/index.js";

describe("authorize", function () {
  /**
   * @param {Authorization} auth
   * @param {string} value
   */
  function createAuthorizeCase(auth, value) {
    return function () {
      should(authorize.call({ method: "DELETE" }, auth))
        .has.properties({ method: "DELETE" })
        .and.has.property("headers")
        .match((headers) => {
          should(headers.get("authorization")).eql(value);
        });
    };
  }

  it(
    "should pass basic authorization",
    createAuthorizeCase(
      { username: "foo", password: "bar" },
      `Basic Zm9vOmJhcg==`
    )
  );

  it(
    "should pass bearer authorization",
    createAuthorizeCase({ bearer: "foo" }, "Bearer foo")
  );

  it(
    "should pass token authorization",
    createAuthorizeCase({ token: "foo" }, "Token foo")
  );

  it("should throw unknown authorization", function () {
    should(() => authorize(/** @type {Authorization} */ ({}))).throwError(
      "Unknown authorization pattern."
    );
  });

  it("should respect authorization in request", function () {
    should(
      authorize.call(
        {
          headers: {
            authorization: "Bearer baz",
          },
        },
        { token: "foo" }
      )
    )
      .has.property("headers")
      .match((headers) => {
        should(headers.get("authorization")).eql("Bearer baz");
      });
  });
});
