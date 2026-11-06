import { type FormEvent, useState } from "react";
import { addTodo, remaining, removeTodo, renameTodo, type Todo, toggleTodo } from "./todos";

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
            <button
              type="button"
              aria-label={`Rename ${todo.title}`}
              onClick={() => {
                const result = window.prompt("Rename item", todo.title);
                if (result === null) return;
                setTodos((current) => renameTodo(current, todo.id, result));
              }}
            >
              Rename
            </button>{" "}
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
