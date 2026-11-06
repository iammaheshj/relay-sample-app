// Pure list logic, kept apart from the UI so it can be unit tested.

export interface Todo {
  id: number;
  title: string;
  done: boolean;
}

export interface TodoState {
  todos: Todo[];
  nextId: number;
}

export function createTodoState(): TodoState {
  return { todos: [], nextId: 1 };
}

export function addTodo(state: TodoState, title: string): TodoState {
  const trimmed = title.trim();
  if (!trimmed) return state;

  const todo: Todo = { id: state.nextId, title: trimmed, done: false };
  return { todos: [...state.todos, todo], nextId: state.nextId + 1 };
}

export function toggleTodo(state: TodoState, id: number): TodoState {
  return {
    ...state,
    todos: state.todos.map((t) => (t.id === id ? { ...t, done: !t.done } : t)),
  };
}

export function removeTodo(state: TodoState, id: number): TodoState {
  return { ...state, todos: state.todos.filter((t) => t.id !== id) };
}

export function remaining(state: TodoState): number {
  return state.todos.filter((t) => !t.done).length;
}
