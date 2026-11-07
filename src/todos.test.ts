import { describe, expect, it } from "vitest";
import { addTodo, remaining, removeTodo, togglePriority, toggleTodo } from "./todos";

describe("addTodo", () => {
  it("adds a trimmed item that isn't done", () => {
    expect(addTodo([], "  Pay rent ")).toEqual([
      { id: 1, title: "Pay rent", done: false, priority: false },
    ]);
  });

  it("ignores a blank title", () => {
    expect(addTodo([], "   ")).toEqual([]);
  });

  it("gives each item a new id", () => {
    const list = addTodo(addTodo([], "a"), "b");
    expect(list.map((t) => t.id)).toEqual([1, 2]);
  });
});

describe("toggleTodo, togglePriority and removeTodo", () => {
  const list = addTodo(addTodo([], "Buy milk"), "Pay rent");

  it("marks only the chosen item done", () => {
    expect(toggleTodo(list, 2).map((t) => t.done)).toEqual([false, true]);
  });

  it("removes only the chosen item", () => {
    expect(removeTodo(list, 1).map((t) => t.title)).toEqual(["Pay rent"]);
  });

  it("counts items left to do", () => {
    expect(remaining(toggleTodo(list, 1))).toBe(1);
  });

  it("marks an item as high priority", () => {
    expect(togglePriority(list, 2).find((t) => t.id === 2)?.priority).toBe(true);
  });

  it("sorts high priority items first", () => {
    const updated = togglePriority(list, 2);
    expect(updated.map((t) => t.title)).toEqual(["Pay rent", "Buy milk"]);
  });
});
