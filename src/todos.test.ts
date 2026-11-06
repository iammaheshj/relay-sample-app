import { describe, expect, it } from "vitest";
import { addTodo, MAX_TITLE_LENGTH, remaining, removeTodo, toggleTodo } from "./todos";

describe("addTodo", () => {
  it("adds a trimmed item that isn't done", () => {
    expect(addTodo([], "  Pay rent ")).toEqual([{ id: 1, title: "Pay rent", done: false }]);
  });

  it("ignores a blank title", () => {
    expect(addTodo([], "   ")).toEqual([]);
  });

  it("cuts a long title to MAX_TITLE_LENGTH characters", () => {
    const longTitle = "x".repeat(MAX_TITLE_LENGTH + 50);
    const list = addTodo([], longTitle);
    expect(list[0]?.title).toHaveLength(MAX_TITLE_LENGTH);
  });

  it("does not change titles that are already within MAX_TITLE_LENGTH", () => {
    const title = "x".repeat(MAX_TITLE_LENGTH);
    const list = addTodo([], title);
    expect(list[0]?.title).toBe(title);
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
