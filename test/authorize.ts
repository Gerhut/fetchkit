import should from "should";
import { authorize } from "../src";
import { Authorization } from "../src/authorize";
import { base64 } from "../src/base64";

describe("authorize", () => {
  function itShouldPass(
    title: string,
    authorization: Authorization,
    value: string
  ) {
    it(`should pass ${title}`, () => {
      should(authorize(authorization).call({ method: "DELETE" }))
        .has.properties({ method: "DELETE" })
        .and.has.property("headers")
        .match((headers: Headers) => {
          should(headers.get("authorization")).eql(value);
        });
    });
  }

  itShouldPass(
    "basic authorization",
    { username: "foo", password: "bar" },
    `Basic ${base64("foo:bar")}`
  );
  itShouldPass("bearer authorization", { bearer: "foo" }, "Bearer foo");
  itShouldPass("token authorization", { token: "foo" }, "Token foo");

  it("should throw unknown authorization", () => {
    should(() => authorize({} as Authorization)).throwError(
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
      .match((headers: Headers) => {
        should(headers.get("authorization")).eql("Bearer baz");
      });
  });
});
