import { type FormEvent, useId, useMemo, useState } from "react";
import { addTodo, remaining, removeTodo, type Todo, toggleTodo } from "./todos";
import { createEmployee, deleteEmployee, findEmployeeById, type Employee, updateEmployee } from "./employees";
import { createUser, type User } from "./users";

export function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [title, setTitle] = useState("");

  const [users, setUsers] = useState<User[]>([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [userError, setUserError] = useState<string | null>(null);
  const userErrorId = useId();

  const [employees, setEmployees] = useState<Employee[]>([]);
  const [newFirstName, setNewFirstName] = useState("");
  const [newLastName, setNewLastName] = useState("");
  const [employeeError, setEmployeeError] = useState<string | null>(null);
  const employeeErrorId = useId();

  const [selectedEmployeeId, setSelectedEmployeeId] = useState<number | null>(null);
  const selectedEmployee = useMemo(() => {
    if (selectedEmployeeId === null) return null;
    return findEmployeeById(employees, selectedEmployeeId) ?? null;
  }, [employees, selectedEmployeeId]);

  const [editFirstName, setEditFirstName] = useState("");
  const [editLastName, setEditLastName] = useState("");

  const [confirmDelete, setConfirmDelete] = useState(false);

  function submitTodo(event: FormEvent) {
    event.preventDefault();
    setTodos((current) => addTodo(current, title));
    setTitle("");
  }

  function submitUser(event: FormEvent) {
    event.preventDefault();

    const result = createUser(users, { name, email });
    if (!result.ok) {
      setUserError(result.error);
      return;
    }

    setUsers(result.users);
    setName("");
    setEmail("");
    setUserError(null);
  }

  function submitEmployee(event: FormEvent) {
    event.preventDefault();

    const result = createEmployee(employees, { firstName: newFirstName, lastName: newLastName });
    if (!result.ok) {
      setEmployeeError(result.error);
      return;
    }

    setEmployees(result.employees);
    setNewFirstName("");
    setNewLastName("");
    setEmployeeError(null);
  }

  function openEmployee(id: number) {
    const employee = findEmployeeById(employees, id);
    if (!employee) return;

    setSelectedEmployeeId(id);
    setEditFirstName(employee.firstName);
    setEditLastName(employee.lastName);
    setConfirmDelete(false);
    setEmployeeError(null);
  }

  function saveSelectedEmployee() {
    if (selectedEmployeeId === null) return;

    const result = updateEmployee(employees, selectedEmployeeId, { firstName: editFirstName, lastName: editLastName });
    if (!result.ok) {
      setEmployeeError(result.error);
      return;
    }

    setEmployees(result.employees);
    setEmployeeError(null);
  }

  function requestDeleteSelectedEmployee() {
    // Confirmation is in UI state to make e2e predictable and accessible.
    setConfirmDelete(true);
  }

  function confirmDeleteSelectedEmployee() {
    if (selectedEmployeeId === null) return;

    setEmployees((current) => deleteEmployee(current, selectedEmployeeId));
    setSelectedEmployeeId(null);
    setEditFirstName("");
    setEditLastName("");
    setConfirmDelete(false);
    setEmployeeError(null);
  }

  return (
    <main style={{ fontFamily: "sans-serif", maxWidth: 480, margin: "2rem auto" }}>
      <section aria-labelledby="todos-heading">
        <h1 id="todos-heading">To-do</h1>
        <form onSubmit={submitTodo}>
          <label htmlFor="new-todo">New item</label>{" "}
          <input id="new-todo" value={title} onChange={(e) => setTitle(e.target.value)} />{" "}
          <button type="submit">Add</button>
        </form>
        <ul aria-label="Items">
          {todos.map((todo) => (
            <li key={todo.id}>
              <label>
                <input
                  type="checkbox"
                  checked={todo.done}
                  onChange={() => setTodos((current) => toggleTodo(current, todo.id))}
                />{" "}
                <span style={{ textDecoration: todo.done ? "line-through" : "none" }}>{todo.title}</span>
              </label>{" "}
              <button
                type="button"
                aria-label={`Delete ${todo.title}`}
                onClick={() => setTodos((current) => removeTodo(current, todo.id))}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
        <p role="status">{remaining(todos)} left to do</p>
      </section>

      <hr />

      <section aria-labelledby="users-heading">
        <h2 id="users-heading">Users</h2>
        <form onSubmit={submitUser} aria-describedby={userError ? userErrorId : undefined}>
          <div>
            <label htmlFor="user-name">Name</label>{" "}
            <input
              id="user-name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (userError) setUserError(null);
              }}
            />
          </div>
          <div>
            <label htmlFor="user-email">Email</label>{" "}
            <input
              id="user-email"
              type="email"
              inputMode="email"
              autoComplete="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (userError) setUserError(null);
              }}
            />
          </div>
          <button type="submit">Create user</button>
          {userError ? (
            <p id={userErrorId} role="alert">
              {userError}
            </p>
          ) : null}
        </form>

        <ul aria-label="Users">
          {users.map((u) => (
            <li key={u.id}>
              {u.name} ({u.email})
            </li>
          ))}
        </ul>
      </section>

      <hr />

      {/* In this single-page app, the “Employees” section acts as the “Employees screen”. */}
      <section aria-labelledby="employees-heading">
        <h2 id="employees-heading">Employees</h2>

        <form onSubmit={submitEmployee} aria-describedby={employeeError ? employeeErrorId : undefined}>
          <div>
            <label htmlFor="new-employee-first-name">First Name</label>{" "}
            <input
              id="new-employee-first-name"
              value={newFirstName}
              onChange={(e) => {
                setNewFirstName(e.target.value);
                if (employeeError) setEmployeeError(null);
              }}
            />
          </div>
          <div>
            <label htmlFor="new-employee-last-name">Last Name</label>{" "}
            <input
              id="new-employee-last-name"
              value={newLastName}
              onChange={(e) => {
                setNewLastName(e.target.value);
                if (employeeError) setEmployeeError(null);
              }}
            />
          </div>
          <button type="submit">Save employee</button>
          {employeeError ? (
            <p id={employeeErrorId} role="alert">
              {employeeError}
            </p>
          ) : null}
        </form>

        <ul aria-label="Employees">
          {employees.map((e) => {
            const label = `${e.firstName} ${e.lastName}`;
            return (
              <li key={e.id}>
                {label}{" "}
                <button type="button" aria-label={`Open ${label}`} onClick={() => openEmployee(e.id)}>
                  Open
                </button>
              </li>
            );
          })}
        </ul>

        <section aria-label="Employee details">
          {selectedEmployee ? (
            <div>
              <h3>
                {selectedEmployee.firstName} {selectedEmployee.lastName}
              </h3>
              <div>
                <label htmlFor="employee-first-name">First Name</label>{" "}
                <input
                  id="employee-first-name"
                  value={editFirstName}
                  onChange={(e) => {
                    setEditFirstName(e.target.value);
                    if (employeeError) setEmployeeError(null);
                  }}
                />
              </div>
              <div>
                <label htmlFor="employee-last-name">Last Name</label>{" "}
                <input
                  id="employee-last-name"
                  value={editLastName}
                  onChange={(e) => {
                    setEditLastName(e.target.value);
                    if (employeeError) setEmployeeError(null);
                  }}
                />
              </div>
              <button type="button" onClick={saveSelectedEmployee}>
                Save changes
              </button>{" "}
              <button type="button" onClick={requestDeleteSelectedEmployee}>
                Delete employee
              </button>

              {confirmDelete ? (
                <div>
                  <p>Are you sure?</p>
                  <button type="button" onClick={confirmDeleteSelectedEmployee}>
                    Confirm delete
                  </button>{" "}
                  <button type="button" onClick={() => setConfirmDelete(false)}>
                    Cancel
                  </button>
                </div>
              ) : null}
            </div>
          ) : (
            <p>Select an employee to view details.</p>
          )}
        </section>
      </section>
    </main>
  );
}
