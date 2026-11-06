import { describe, expect, it } from "vitest";
import { addTodo, remaining, removeTodo, togglePriority, toggleTodo } from "./todos";

describe("addTodo", () => {
  it("adds a trimmed item that isn't done", () => {
    expect(addTodo([], "  Pay rent ")).toEqual([{ id: 1, title: "Pay rent", done: false, priority: false }]);
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
    expect(togglePriority(list, 1)[0]).toMatchObject({ title: "Pay rent", priority: true });
  });

  it("sorts high priority items first and keeps id order within each group", () => {
    const list = addTodo(addTodo(addTodo([], "c"), "a"), "b");

    // Make b (id 3) high priority. It should sort ahead of non-priority items.
    const updated = togglePriority(list, 3);
    expect(updated.map((t) => t.title)).toEqual(["b", "c", "a"]);

    // Now make a (id 2) high priority as well. It should come before b because id 2 < 3.
    const updatedAgain = togglePriority(updated, 2);
    expect(updatedAgain.map((t) => t.title)).toEqual(["a", "b", "c"]);
  });
});
