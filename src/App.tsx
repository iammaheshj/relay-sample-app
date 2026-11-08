import { type FormEvent, useState } from "react";
import {
  addTodo,
  remaining,
  removeTodo,
  type Todo,
  togglePriority,
  toggleTodo,
} from "./todos";

export function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [title, setTitle] = useState("");

  function submit(event: FormEvent) {
    event.preventDefault();
    setTodos((current) => addTodo(current, title));
    setTitle("");
  }

  return (
    <main style={{ fontFamily: "sans-serif", maxWidth: 480, margin: "2rem auto" }}>
      <h1>To-do</h1>
      <form onSubmit={submit}>
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
            <label>
              <input
                type="checkbox"
                checked={todo.priority}
                onChange={() => setTodos((current) => togglePriority(current, todo.id))}
              />{" "}
              High priority
            </label>{" "}
            {todo.priority ? <span aria-label="High priority">High priority</span> : null}{" "}
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
    </main>
  );
}
