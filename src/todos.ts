// Pure list logic, kept apart from the UI so it can be unit tested.

export interface Todo {
  id: number;
  title: string;
  done: boolean;
}

let nextId = 1;

function ensureNextIdIsAboveUsedIds(todos: Todo[]): void {
  const maxId = todos.reduce((max, t) => Math.max(max, t.id), 0);
  nextId = Math.max(nextId, maxId + 1);
}

export function addTodo(todos: Todo[], title: string): Todo[] {
  const trimmed = title.trim();
  if (!trimmed) return todos;

  ensureNextIdIsAboveUsedIds(todos);
  const id = nextId;
  nextId += 1;

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
