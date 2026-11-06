import { type FormEvent, useState } from "react";
import {
  addTodo,
  createTodoState,
  remaining,
  removeTodo,
  toggleTodo,
  type TodoState,
} from "./todos";

export function App() {
  const [state, setState] = useState<TodoState>(createTodoState());
  const [title, setTitle] = useState("");

  function submit(event: FormEvent) {
    event.preventDefault();
    setState((current) => addTodo(current, title));
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
        {state.todos.map((todo) => (
          <li key={todo.id}>
            <label>
              <input
                type="checkbox"
                checked={todo.done}
                onChange={() => setState((current) => toggleTodo(current, todo.id))}
              />{" "}
              <span style={{ textDecoration: todo.done ? "line-through" : "none" }}>{todo.title}</span>
            </label>{" "}
            <button
              type="button"
              aria-label={`Delete ${todo.title}`}
              onClick={() => setState((current) => removeTodo(current, todo.id))}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
      <p role="status">{remaining(state)} left to do</p>
    </main>
  );
}
