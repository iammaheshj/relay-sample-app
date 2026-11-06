import { describe, expect, it } from "vitest";
import { addTodo, remaining, removeTodo, renameTodo, toggleTodo } from "./todos";

describe("addTodo", () => {
  it("adds a trimmed item that isn't done", () => {
    expect(addTodo([], "  Pay rent ")).toEqual([{ id: 1, title: "Pay rent", done: false }]);
  });

  it("ignores a blank title", () => {
    expect(addTodo([], "   ")).toEqual([]);
  });

  it("gives each item a new id", () => {
    const list = addTodo(addTodo([], "a"), "b");
    expect(list.map((t) => t.id)).toEqual([1, 2]);
  });
});

describe("renameTodo", () => {
  it("renames an item with a trimmed title", () => {
    const list = addTodo([], "Pay rnet");
    expect(renameTodo(list, 1, "  Pay rent ").map((t) => t.title)).toEqual(["Pay rent"]);
  });

  it("keeps the old title for a blank name", () => {
    const list = addTodo([], "Pay rent");
    expect(renameTodo(list, 1, "   ").map((t) => t.title)).toEqual(["Pay rent"]);
  });

  it("returns the original array when no item matches", () => {
    const list = addTodo([], "Pay rent");
    expect(renameTodo(list, 999, "New title")).toBe(list);
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
