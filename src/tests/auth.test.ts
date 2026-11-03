import { describe, expect, test } from "vitest";
import { getAPIKey } from "../api/auth.js";

describe("getAPIKey", () => {
  test("returns the key from a valid ApiKey authorization header", () => {
    expect(getAPIKey({ authorization: "ApiKey my-secret-key" })).toBe(
      "my-secret-key",
    );
  });

  test("returns null when the authorization header is missing", () => {
    expect(getAPIKey({})).toBeNull();
  });

  test("returns null when the authorization header is empty", () => {
    expect(getAPIKey({ authorization: "" })).toBeNull();
  });

  test("returns null when the scheme is not ApiKey", () => {
    expect(getAPIKey({ authorization: "Bearer my-secret-key" })).toBeNull();
  });

  test("returns null when the scheme has the wrong casing", () => {
    expect(getAPIKey({ authorization: "apikey my-secret-key" })).toBeNull();
  });

  test("returns null when only the scheme is provided", () => {
    expect(getAPIKey({ authorization: "ApiKey" })).toBeNull();
  });

  test("returns null when the key is not separated by a space", () => {
    expect(getAPIKey({ authorization: "ApiKeymy-secret-key" })).toBeNull();
  });

  test("returns only the first token after the scheme", () => {
    expect(getAPIKey({ authorization: "ApiKey key extra" })).toBe("key");
  });
});
