// Pure list logic, kept apart from the UI so it can be unit tested.

export interface Todo {
  id: number;
  title: string;
  done: boolean;
}

function tidyTitle(title: string): string {
  // Trim ends, then collapse any run of whitespace (spaces, tabs, newlines, etc.)
  // into a single space so titles never contain line breaks or repeated spacing.
  return title.trim().replace(/\s+/g, " ");
}

export function addTodo(todos: Todo[], title: string): Todo[] {
  const tidied = tidyTitle(title);
  if (!tidied) return todos;

  const id = todos.reduce((max, t) => Math.max(max, t.id), 0) + 1;
  return [...todos, { id, title: tidied, done: false }];
}

export function toggleTodo(todos: Todo[], id: number): Todo[] {
  return todos.map((t) => (t.id === id ? { ...t, done: !t.done } : t));
}

export function removeTodo(todos: Todo[], id: number): Todo[] {
  return todos.filter((t) => t.id !== id);
}

export function remaining(todos: Todo[]): number {
  return todos.filter((t) => !t.done).length;
}
