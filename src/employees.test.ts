import { describe, expect, it } from "vitest";
import {
  createEmployee,
  deleteEmployee,
  findEmployeeById,
  type Employee,
  updateEmployee,
} from "./employees";

describe("createEmployee", () => {
  it("creates an employee with trimmed names", () => {
    const result = createEmployee([], { firstName: "  Alex ", lastName: " Kim  " });
    expect(result.ok).toBe(true);
    if (!result.ok) throw new Error("expected ok result");
    expect(result.employees).toEqual([{ id: 1, firstName: "Alex", lastName: "Kim" }]);
  });

  it("requires a first name", () => {
    const result = createEmployee([], { firstName: "   ", lastName: "Kim" });
    expect(result).toEqual({ ok: false, employees: [], error: "First name is required" });
  });

  it("requires a last name", () => {
    const result = createEmployee([], { firstName: "Alex", lastName: "  " });
    expect(result).toEqual({ ok: false, employees: [], error: "Last name is required" });
  });

  it("assigns increasing ids", () => {
    const a = createEmployee([], { firstName: "Alex", lastName: "Kim" });
    if (!a.ok) throw new Error("expected ok result");
    const b = createEmployee(a.employees, { firstName: "Sam", lastName: "Lee" });
    if (!b.ok) throw new Error("expected ok result");
    expect(b.employees.map((e) => e.id)).toEqual([1, 2]);
  });
});

describe("findEmployeeById", () => {
  it("returns an existing employee", () => {
    const employees: Employee[] = [{ id: 1, firstName: "Alex", lastName: "Kim" }];
    expect(findEmployeeById(employees, 1)).toEqual({ id: 1, firstName: "Alex", lastName: "Kim" });
  });

  it("returns undefined when missing", () => {
    const employees: Employee[] = [{ id: 1, firstName: "Alex", lastName: "Kim" }];
    expect(findEmployeeById(employees, 2)).toBeUndefined();
  });
});

describe("updateEmployee", () => {
  it("updates the last name", () => {
    const employees: Employee[] = [{ id: 1, firstName: "Alex", lastName: "Kim" }];
    const result = updateEmployee(employees, 1, { lastName: "Kumar" });
    expect(result.ok).toBe(true);
    if (!result.ok) throw new Error("expected ok result");
    expect(result.employees).toEqual([{ id: 1, firstName: "Alex", lastName: "Kumar" }]);
  });

  it("trims updated fields", () => {
    const employees: Employee[] = [{ id: 1, firstName: "Alex", lastName: "Kim" }];
    const result = updateEmployee(employees, 1, { lastName: "  Kumar  " });
    expect(result.ok).toBe(true);
    if (!result.ok) throw new Error("expected ok result");
    expect(result.employees[0]?.lastName).toBe("Kumar");
  });

  it("errors when employee is not found", () => {
    const employees: Employee[] = [{ id: 1, firstName: "Alex", lastName: "Kim" }];
    const result = updateEmployee(employees, 2, { lastName: "Kumar" });
    expect(result).toEqual({ ok: false, employees, error: "Employee not found" });
  });

  it("requires non-empty names after update", () => {
    const employees: Employee[] = [{ id: 1, firstName: "Alex", lastName: "Kim" }];
    const result = updateEmployee(employees, 1, { lastName: "  " });
    expect(result).toEqual({ ok: false, employees, error: "Last name is required" });
  });

  it("does not mutate the original array", () => {
    const employees: Employee[] = [{ id: 1, firstName: "Alex", lastName: "Kim" }];
    const snapshot = structuredClone(employees);

    updateEmployee(employees, 1, { lastName: "Kumar" });

    expect(employees).toEqual(snapshot);
  });
});

describe("deleteEmployee", () => {
  it("removes only the chosen employee", () => {
    const employees: Employee[] = [
      { id: 1, firstName: "Alex", lastName: "Kim" },
      { id: 2, firstName: "Sam", lastName: "Lee" },
    ];
    expect(deleteEmployee(employees, 1)).toEqual([{ id: 2, firstName: "Sam", lastName: "Lee" }]);
  });
});
