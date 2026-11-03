import { describe, expect, it } from "vitest";
import { createUser, type User } from "./users";

describe("createUser", () => {
  it("creates a user with trimmed name and normalized email", () => {
    const result = createUser([], { name: "  Ada Lovelace ", email: "  ADA@Example.COM  " });
    expect(result.ok).toBe(true);
    if (!result.ok) throw new Error("expected ok result");
    expect(result.users).toEqual([{ id: 1, name: "Ada Lovelace", email: "ada@example.com" }]);
  });

  it("requires a name", () => {
    const result = createUser([], { name: "   ", email: "a@example.com" });
    expect(result).toEqual({ ok: false, users: [], error: "Name is required" });
  });

  it("requires an email", () => {
    const result = createUser([], { name: "Ada", email: "  " });
    expect(result).toEqual({ ok: false, users: [], error: "Email is required" });
  });

  it("rejects an invalid email", () => {
    const result = createUser([], { name: "Ada", email: "not-an-email" });
    expect(result).toEqual({ ok: false, users: [], error: "Email is invalid" });
  });

  it("rejects duplicate emails case-insensitively", () => {
    const existing: User[] = [{ id: 1, name: "A", email: "ada@example.com" }];
    const result = createUser(existing, { name: "B", email: "ADA@EXAMPLE.COM" });
    expect(result).toEqual({ ok: false, users: existing, error: "Email already exists" });
  });

  it("assigns increasing ids", () => {
    const a = createUser([], { name: "Ada", email: "ada@example.com" });
    if (!a.ok) throw new Error("expected ok result");
    const b = createUser(a.users, { name: "Grace", email: "grace@example.com" });
    if (!b.ok) throw new Error("expected ok result");
    expect(b.users.map((u) => u.id)).toEqual([1, 2]);
  });
});
