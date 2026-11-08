import { type FormEvent, useId, useState } from "react";
import { addTodo, remaining, removeTodo, renameTodo, type Todo, toggleTodo } from "./todos";

export function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [title, setTitle] = useState("");
  const renameHintId = useId();

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
      <p id={renameHintId} style={{ fontSize: "0.875rem" }}>
        Tip: edit a name and tab away (or click elsewhere) to save.
      </p>
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
            </button>{" "}
            <label>
              <span>Rename</span>{" "}
              <input
                aria-label={`Rename ${todo.title}`}
                aria-describedby={renameHintId}
                defaultValue={todo.title}
                onBlur={(e) => setTodos((current) => renameTodo(current, todo.id, e.target.value))}
              />
            </label>
          </li>
        ))}
      </ul>
      <p role="status">{remaining(todos)} left to do</p>
    </main>
  );
}
