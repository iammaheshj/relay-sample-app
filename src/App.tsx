import { type FormEvent, useId, useState } from "react";
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
          <TodoRow
            key={todo.id}
            todo={todo}
            onToggle={() => setTodos((current) => toggleTodo(current, todo.id))}
            onRemove={() => setTodos((current) => removeTodo(current, todo.id))}
            onRename={(nextTitle) => setTodos((current) => renameTodo(current, todo.id, nextTitle))}
          />
        ))}
      </ul>
      <p role="status">{remaining(todos)} left to do</p>
    </main>
  );
}

function TodoRow({
  todo,
  onToggle,
  onRemove,
  onRename,
}: {
  todo: Todo;
  onToggle: () => void;
  onRemove: () => void;
  onRename: (title: string) => void;
}) {
  const renameId = useId();
  const [isRenaming, setIsRenaming] = useState(false);
  const [nextTitle, setNextTitle] = useState(todo.title);

  function submitRename(event: FormEvent) {
    event.preventDefault();
    onRename(nextTitle);
    setIsRenaming(false);
  }

  return (
    <li>
      <label>
        <input type="checkbox" checked={todo.done} onChange={onToggle} />{" "}
        <span style={{ textDecoration: todo.done ? "line-through" : "none" }}>{todo.title}</span>
      </label>{" "}

      <button
        type="button"
        aria-label={`Rename ${todo.title}`}
        onClick={() => {
          setNextTitle(todo.title);
          setIsRenaming(true);
        }}
      >
        Rename
      </button>{" "}

      <button type="button" aria-label={`Delete ${todo.title}`} onClick={onRemove}>
        Delete
      </button>

      {isRenaming ? (
        <form onSubmit={submitRename}>
          <label htmlFor={renameId}>New name for {todo.title}</label>{" "}
          <input id={renameId} value={nextTitle} onChange={(e) => setNextTitle(e.target.value)} />{" "}
          <button type="submit">Save</button>{" "}
          <button type="button" onClick={() => setIsRenaming(false)}>
            Cancel
          </button>
        </form>
      ) : null}
    </li>
  );
}
