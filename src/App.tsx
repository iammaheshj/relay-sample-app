import { type FormEvent, useId, useState } from "react";
import { addTodo, remaining, removeTodo, type Todo, togglePriority, toggleTodo } from "./todos";

export function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [title, setTitle] = useState("");
  const newTodoId = useId();

  function submit(event: FormEvent) {
    event.preventDefault();
    setTodos((current) => addTodo(current, title));
    setTitle("");
  }

  return (
    <main style={{ fontFamily: "sans-serif", maxWidth: 480, margin: "2rem auto" }}>
      <h1>To-do</h1>
      <form onSubmit={submit}>
        <label htmlFor={newTodoId}>New item</label>{" "}
        <input id={newTodoId} value={title} onChange={(e) => setTitle(e.target.value)} />{" "}
        <button type="submit">Add</button>
      </form>
      <ul aria-label="Items">
        {todos.map((todo) => {
          const priorityId = `priority-${todo.id}`;
          return (
            <li key={todo.id}>
              <label>
                <input
                  type="checkbox"
                  checked={todo.done}
                  onChange={() => setTodos((current) => toggleTodo(current, todo.id))}
                />{" "}
                <span style={{ textDecoration: todo.done ? "line-through" : "none" }}>{todo.title}</span>
              </label>{" "}
              <input
                id={priorityId}
                type="checkbox"
                checked={todo.priority}
                onChange={() => setTodos((current) => togglePriority(current, todo.id))}
              />{" "}
              <label htmlFor={priorityId}>High priority</label>{" "}
              {todo.priority ? (
                <span aria-label="High priority" role="status">
                  High priority
                </span>
              ) : null}{" "}
              <button
                type="button"
                aria-label={`Delete ${todo.title}`}
                onClick={() => setTodos((current) => removeTodo(current, todo.id))}
              >
                Delete
              </button>
            </li>
          );
        })}
      </ul>
      <p role="status">{remaining(todos)} left to do</p>
    </main>
  );
}
