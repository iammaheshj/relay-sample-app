import { describe, expect, it } from "vitest";
import { addTodo, remaining, removeTodo, toggleTodo } from "./todos";

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

  it("does not reuse an id after deleting the last item", () => {
    const withAandB = addTodo(addTodo([], "a"), "b");
    const bId = withAandB.find((t) => t.title === "b")?.id;
    expect(bId).toBeDefined();

    const withoutB = removeTodo(withAandB, bId!);
    const withC = addTodo(withoutB, "c");

    // This is the acceptance criterion: after deleting "b", the new item "c" must not
    // reuse b's old id.
    expect(withC.find((t) => t.title === "c")?.id).not.toBe(bId);
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
