import { describe, expect, it } from "vitest";
import { buildMailto } from "./contact-dialog";

describe("buildMailto", () => {
  it("puts the sender in the subject and the message plus reply address in the body", () => {
    const url = buildMailto("me@x.com", { first: "Ana", last: "Cruz", email: "ana@y.com", message: "Hi & hello" });
    const [base, query] = url.split("?");
    expect(base).toBe("mailto:me@x.com");
    const params = new URLSearchParams(query.replace(/%20/g, "+"));
    expect(params.get("subject")).toBe("Hello from Ana Cruz");
    expect(params.get("body")).toBe("Hi & hello\n\n— Ana Cruz\nana@y.com");
  });
});
