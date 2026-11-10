export interface User {
  name: string;
  email: string;
}

export type CreateUserError =
  | "NAME_REQUIRED"
  | "EMAIL_REQUIRED"
  | "EMAIL_INVALID"
  | "EMAIL_EXISTS";

export interface CreateUserResult {
  user?: User;
  error?: CreateUserError;
}

export function normalizeName(name: string): string {
  return name.trim();
}

export function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

export function isValidEmail(email: string): boolean {
  // Deterministic, intentionally simple rule:
  // - exactly one '@'
  // - at least one '.' after '@'
  // - no spaces
  if (!email) return false;
  if (/\s/.test(email)) return false;
  const at = email.indexOf("@");
  if (at <= 0) return false;
  if (email.indexOf("@", at + 1) !== -1) return false;
  const domain = email.slice(at + 1);
  const dot = domain.indexOf(".");
  if (dot <= 0) return false;
  if (dot === domain.length - 1) return false;
  return true;
}

export function createUser(users: User[], name: string, email: string): CreateUserResult {
  const normalizedName = normalizeName(name);
  if (!normalizedName) return { error: "NAME_REQUIRED" };

  const normalizedEmail = normalizeEmail(email);
  if (!normalizedEmail) return { error: "EMAIL_REQUIRED" };

  if (!isValidEmail(normalizedEmail)) return { error: "EMAIL_INVALID" };

  const exists = users.some((u) => normalizeEmail(u.email) === normalizedEmail);
  if (exists) return { error: "EMAIL_EXISTS" };

  return { user: { name: normalizedName, email: normalizedEmail } };
}

export function errorMessage(error: CreateUserError): string {
  switch (error) {
    case "NAME_REQUIRED":
      return "Name is required";
    case "EMAIL_REQUIRED":
      return "Email is required";
    case "EMAIL_INVALID":
      return "Email is invalid";
    case "EMAIL_EXISTS":
      return "Email already exists";
  }
}
