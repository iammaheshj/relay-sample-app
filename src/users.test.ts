import { describe, expect, it } from "vitest";
import { createUser, errorMessage } from "./users";

describe("createUser", () => {
  it("creates a user with normalized values", () => {
    const result = createUser([], "  Ada Lovelace  ", "  ADA@EXAMPLE.COM  ");
    expect(result).toEqual({ user: { name: "Ada Lovelace", email: "ada@example.com" } });
  });

  it("rejects a blank name", () => {
    const result = createUser([], "   ", "ada@example.com");
    expect(result).toEqual({ error: "NAME_REQUIRED" });
    expect(errorMessage(result.error!)).toBe("Name is required");
  });

  it("rejects a blank email", () => {
    const result = createUser([], "Ada Lovelace", "   ");
    expect(result).toEqual({ error: "EMAIL_REQUIRED" });
    expect(errorMessage(result.error!)).toBe("Email is required");
  });

  it("rejects an invalid email", () => {
    const result = createUser([], "Ada Lovelace", "not-an-email");
    expect(result).toEqual({ error: "EMAIL_INVALID" });
    expect(errorMessage(result.error!)).toBe("Email is invalid");
  });

  it("rejects duplicate normalized emails", () => {
    const existing = [{ name: "Ada Lovelace", email: "ada@example.com" }];
    const result = createUser(existing, "Ada Lovelace", " ADA@EXAMPLE.COM ");
    expect(result).toEqual({ error: "EMAIL_EXISTS" });
    expect(errorMessage(result.error!)).toBe("Email already exists");
  });
});
