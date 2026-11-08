import { type FormEvent, useId, useState } from "react";
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
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggleDone={() => setTodos((current) => toggleTodo(current, todo.id))}
            onTogglePriority={() => setTodos((current) => togglePriority(current, todo.id))}
            onDelete={() => setTodos((current) => removeTodo(current, todo.id))}
          />
        ))}
      </ul>
      <p role="status">{remaining(todos)} left to do</p>
    </main>
  );
}

type TodoItemProps = {
  todo: Todo;
  onToggleDone: () => void;
  onTogglePriority: () => void;
  onDelete: () => void;
};

function TodoItem({ todo, onToggleDone, onTogglePriority, onDelete }: TodoItemProps) {
  const priorityId = useId();

  return (
    <li>
      <label>
        <input type="checkbox" checked={todo.done} onChange={onToggleDone} />{" "}
        <span style={{ textDecoration: todo.done ? "line-through" : "none" }}>{todo.title}</span>
      </label>{" "}
      <input
        id={priorityId}
        type="checkbox"
        checked={todo.priority}
        onChange={onTogglePriority}
      />{" "}
      <label htmlFor={priorityId}>High priority</label>{" "}
      {todo.priority ? (
        <span aria-label="High priority" style={{ fontWeight: 600 }}>
          High priority
        </span>
      ) : null}{" "}
      <button type="button" aria-label={`Delete ${todo.title}`} onClick={onDelete}>
        Delete
      </button>
    </li>
  );
}
