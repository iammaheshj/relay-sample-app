import { describe, expect, it } from "vitest";
import { addTodo, remaining, removeTodo, statusText, toggleTodo } from "./todos";

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

describe("statusText", () => {
  it("returns a friendlier message when nothing is left", () => {
    expect(statusText(0)).toBe("Nothing left to do");
  });

  it("returns the count when there are items remaining", () => {
    expect(statusText(2)).toBe("2 left to do");
  });

  it("is defensive about invalid numbers", () => {
    expect(statusText(-1)).toBe("Nothing left to do");
    expect(statusText(Number.NaN)).toBe("Nothing left to do");
  });
});
