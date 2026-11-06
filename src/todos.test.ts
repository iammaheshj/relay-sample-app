import { describe, expect, it } from "vitest";
import {
  addTodo,
  createTodoState,
  remaining,
  removeTodo,
  toggleTodo,
  type TodoState,
} from "./todos";

describe("addTodo", () => {
  it("adds a trimmed item that isn't done", () => {
    const state = addTodo(createTodoState(), "  Pay rent ");
    expect(state.todos).toEqual([{ id: 1, title: "Pay rent", done: false }]);
  });

  it("ignores a blank title", () => {
    const state = addTodo(createTodoState(), "   ");
    expect(state.todos).toEqual([]);
  });

  it("gives each item a new id", () => {
    const state = addTodo(addTodo(createTodoState(), "a"), "b");
    expect(state.todos.map((t) => t.id)).toEqual([1, 2]);
  });

  it("does not reuse an id after deleting the last item", () => {
    const state = addTodo(addTodo(createTodoState(), "a"), "b");
    const bId = state.todos.find((t) => t.title === "b")?.id;
    expect(bId).toBeTypeOf("number");

    const afterDelete = removeTodo(state, bId as number);
    const afterAdd = addTodo(afterDelete, "c");

    const cId = afterAdd.todos.find((t) => t.title === "c")?.id;
    expect(cId).toBeTypeOf("number");
    expect(cId).not.toBe(bId);
  });
});

describe("toggleTodo and removeTodo", () => {
  const state: TodoState = addTodo(addTodo(createTodoState(), "a"), "b");

  it("marks only the chosen item done", () => {
    expect(toggleTodo(state, 2).todos.map((t) => t.done)).toEqual([false, true]);
  });

  it("removes only the chosen item", () => {
    expect(removeTodo(state, 1).todos.map((t) => t.title)).toEqual(["b"]);
  });

  it("counts items left to do", () => {
    expect(remaining(toggleTodo(state, 1))).toBe(1);
  });
});
