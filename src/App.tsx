import { type FormEvent, useId, useState } from "react";
import { addTodo, remaining, removeTodo, type Todo, toggleTodo } from "./todos";
import { createUser, type User } from "./users";

export function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [title, setTitle] = useState("");

  const [users, setUsers] = useState<User[]>([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [userError, setUserError] = useState<string | null>(null);
  const userErrorId = useId();

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
        <form noValidate onSubmit={submitUser}>
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
    </main>
  );
}
