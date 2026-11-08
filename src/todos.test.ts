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

describe("toggleTodo and removeTodo", () => {
  const list = addTodo(addTodo([], "a"), "b");

  it("marks only the chosen item done", () => {
    expect(toggleTodo(list, 2).map((t) => t.done)).toEqual([false, true]);
  });

  it("removes only the chosen item", () => {
    expect(removeTodo(list, 1).map((t) => t.title)).toEqual(["b"]);
  });

  it("counts items left to do", () => {
    expect(remaining(toggleTodo(list, 1))).toBe(1);
  });
});

describe("togglePriority", () => {
  it("marks an item as high priority", () => {
    const list = addTodo([], "Pay rent");
    expect(togglePriority(list, 1)).toEqual([
      { id: 1, title: "Pay rent", done: false, priority: true },
    ]);
  });

  it("sorts high priority items first", () => {
    const list = addTodo(addTodo([], "Buy milk"), "Pay rent");
    expect(list.map((t) => t.title)).toEqual(["Buy milk", "Pay rent"]);

    const next = togglePriority(list, 2);
    expect(next.map((t) => t.title)).toEqual(["Pay rent", "Buy milk"]);
  });

  it("keeps relative order within the same priority", () => {
    const list = addTodo(addTodo(addTodo([], "a"), "b"), "c");
    const next = togglePriority(togglePriority(list, 3), 1);

    // a and c are high priority (ids 1 and 3); they should keep id order.
    expect(next.map((t) => t.title)).toEqual(["a", "c", "b"]);
  });
});
