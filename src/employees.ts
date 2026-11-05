// Pure list logic for employee records, kept apart from the UI so it can be unit tested.

export interface Employee {
  id: number;
  firstName: string;
  lastName: string;
}

export interface NewEmployeeInput {
  firstName: string;
  lastName: string;
}

export type CreateEmployeeResult =
  | { ok: true; employees: Employee[] }
  | { ok: false; employees: Employee[]; error: string };

export function createEmployee(employees: Employee[], input: NewEmployeeInput): CreateEmployeeResult {
  const firstName = input.firstName.trim();
  const lastName = input.lastName.trim();

  if (!firstName) return { ok: false, employees, error: "First name is required" };
  if (!lastName) return { ok: false, employees, error: "Last name is required" };

  const id = employees.reduce((max, e) => Math.max(max, e.id), 0) + 1;
  return { ok: true, employees: [...employees, { id, firstName, lastName }] };
}

export function findEmployeeById(employees: Employee[], id: number): Employee | undefined {
  return employees.find((e) => e.id === id);
}

export type UpdateEmployeeResult =
  | { ok: true; employees: Employee[] }
  | { ok: false; employees: Employee[]; error: string };

export interface UpdateEmployeePatch {
  firstName?: string;
  lastName?: string;
}

export function updateEmployee(employees: Employee[], id: number, patch: UpdateEmployeePatch): UpdateEmployeeResult {
  const current = findEmployeeById(employees, id);
  if (!current) return { ok: false, employees, error: "Employee not found" };

  const firstName = patch.firstName === undefined ? current.firstName : patch.firstName.trim();
  const lastName = patch.lastName === undefined ? current.lastName : patch.lastName.trim();

  if (!firstName) return { ok: false, employees, error: "First name is required" };
  if (!lastName) return { ok: false, employees, error: "Last name is required" };

  return {
    ok: true,
    employees: employees.map((e) => (e.id === id ? { ...e, firstName, lastName } : e)),
  };
}

export function deleteEmployee(employees: Employee[], id: number): Employee[] {
  return employees.filter((e) => e.id !== id);
}
