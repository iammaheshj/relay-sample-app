import { type FormEvent, useState } from "react";
import { createUser, errorMessage, type User } from "./users";
import { addTodo, remaining, removeTodo, type Todo, toggleTodo } from "./todos";

export function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [title, setTitle] = useState("");

  const [users, setUsers] = useState<User[]>([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [userAlert, setUserAlert] = useState<string | null>(null);

  function submitTodo(event: FormEvent) {
    event.preventDefault();
    setTodos((current) => addTodo(current, title));
    setTitle("");
  }

  function submitUser(event: FormEvent) {
    event.preventDefault();

    const result = createUser(users, name, email);
    if (result.error) {
      setUserAlert(errorMessage(result.error));
      return;
    }

    setUsers((current) => [...current, result.user]);
    setUserAlert(null);
  }

  return (
    <main style={{ fontFamily: "sans-serif", maxWidth: 480, margin: "2rem auto" }}>
      <h1>To-do</h1>
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

      <hr />

      <h2>Users</h2>
      <form noValidate onSubmit={submitUser}>
        <label htmlFor="user-name">Name</label>{" "}
        <input id="user-name" value={name} onChange={(e) => setName(e.target.value)} />
        <br />
        <label htmlFor="user-email">Email</label>{" "}
        <input id="user-email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <button type="submit">Create user</button>
      </form>
      {userAlert ? <p role="alert">{userAlert}</p> : null}
      <ul aria-label="Users" style={{ display: "block" }}>
        {users.map((u) => (
          <li key={u.email}>
            {u.name} ({u.email})
          </li>
        ))}
      </ul>
    </main>
  );
}
