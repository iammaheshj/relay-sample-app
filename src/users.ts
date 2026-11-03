// Pure list logic for user records, kept apart from the UI so it can be unit tested.

export interface User {
  id: number;
  name: string;
  email: string;
}

export interface NewUserInput {
  name: string;
  email: string;
}

export type CreateUserResult =
  | { ok: true; users: User[] }
  | { ok: false; users: User[]; error: string };

export function createUser(users: User[], input: NewUserInput): CreateUserResult {
  const name = input.name.trim();
  const email = input.email.trim().toLowerCase();

  if (!name) return { ok: false, users, error: "Name is required" };
  if (!email) return { ok: false, users, error: "Email is required" };

  // Simple, practical check: enough for basic UX without external libraries.
  const emailPattern = /^\S+@\S+\.\S+$/;
  if (!emailPattern.test(email)) return { ok: false, users, error: "Email is invalid" };

  const duplicate = users.some((u) => u.email.toLowerCase() === email);
  if (duplicate) return { ok: false, users, error: "Email already exists" };

  const id = users.reduce((max, u) => Math.max(max, u.id), 0) + 1;
  return { ok: true, users: [...users, { id, name, email }] };
}
