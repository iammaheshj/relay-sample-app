// Pure list logic, kept apart from the UI so it can be unit tested.

export interface Todo {
  id: number;
  title: string;
  done: boolean;
  priority: boolean;
}

function sortTodos(todos: Todo[]): Todo[] {
  return [...todos].sort((a, b) => {
    if (a.priority !== b.priority) return a.priority ? -1 : 1;
    return a.id - b.id;
  });
}

function hasTodoId(todos: Todo[], id: number): boolean {
  return todos.some((t) => t.id === id);
}

export function addTodo(todos: Todo[], title: string): Todo[] {
  const trimmed = title.trim();
  if (!trimmed) return todos;
  const id = todos.reduce((max, t) => Math.max(max, t.id), 0) + 1;
  return sortTodos([...todos, { id, title: trimmed, done: false, priority: false }]);
}

export function toggleTodo(todos: Todo[], id: number): Todo[] {
  if (!hasTodoId(todos, id)) return todos;
  return sortTodos(todos.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));
}

export function togglePriority(todos: Todo[], id: number): Todo[] {
  if (!hasTodoId(todos, id)) return todos;
  return sortTodos(todos.map((t) => (t.id === id ? { ...t, priority: !t.priority } : t)));
}

export function removeTodo(todos: Todo[], id: number): Todo[] {
  if (!hasTodoId(todos, id)) return todos;
  return sortTodos(todos.filter((t) => t.id !== id));
}

export function remaining(todos: Todo[]): number {
  return todos.filter((t) => !t.done).length;
}
