import should from "should";
import { json } from "../src/index.js";

describe("json", function () {
  it("should convert payload into POST request", function () {
    should(json({ foo: "bar" }))
      .has.only.keys("method", "headers", "body")
      .and.has.properties({
        method: "POST",
        body: JSON.stringify({ foo: "bar" }),
      })
      .and.has.a.property("headers")
      .match((headers) => {
        should(headers.get("content-type")).eql("application/json");
      });
  });

  it("should keep method", function () {
    should(json.call({ method: "PUT" }, {})).has.a.property("method", "PUT");
  });

  it("should keep Content-Type headers", function () {
    should(
      json.call({ headers: { "Content-Type": "application/vnd+json" } }, {})
    )
      .has.a.property("headers")
      .match((headers) => {
        should(headers.get("content-type")).eql("application/vnd+json");
      });
  });

  it("should keep other headers", function () {
    should(json.call({ headers: { Authorization: "Bearer token" } }, {}))
      .has.a.property("headers")
      .match((headers) => {
        should(headers.get("Authorization")).eql("Bearer token");
      });
  });

  it("should keep original body", function () {
    should(json.call({ body: "foo" }, {})).has.a.property("body", "foo");
  });

  it("should keep other options", function () {
    should(json.call({ credentials: "omit" }, {})).has.a.property(
      "credentials",
      "omit"
    );
  });
});
