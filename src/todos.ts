// Pure list logic, kept apart from the UI so it can be unit tested.

export interface Todo {
  id: number;
  title: string;
  done: boolean;
}

// Ids must never be reused, even if the item with the highest id is deleted.
// We track the highest id that has ever been used in this module.
let highestIdEverUsed = 0;

function getNextId(todos: Todo[]): number {
  // Keep the counter in sync if callers provide pre-existing todos.
  const highestInList = todos.reduce((max, t) => Math.max(max, t.id), 0);
  highestIdEverUsed = Math.max(highestIdEverUsed, highestInList);

  highestIdEverUsed += 1;
  return highestIdEverUsed;
}

export function addTodo(todos: Todo[], title: string): Todo[] {
  const trimmed = title.trim();
  if (!trimmed) return todos;

  const id = getNextId(todos);

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
