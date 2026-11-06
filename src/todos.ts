// Pure list logic, kept apart from the UI so it can be unit tested.

export interface Todo {
  id: number;
  title: string;
  done: boolean;
}

function nextId(todos: Todo[]): number {
  // Never reuse an id.
  //
  // Using (max current id + 1) is stable for a single session even if items are
  // deleted.
  return todos.reduce((max, t) => Math.max(max, t.id), 0) + 1;
}

export function addTodo(todos: Todo[], title: string): Todo[] {
  const trimmed = title.trim();
  if (!trimmed) return todos;
  const id = nextId(todos);
  return [...todos, { id, title: trimmed, done: false }];
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
