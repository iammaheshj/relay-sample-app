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
    const list = addTodo(addTodo([], "a"), "b");
    const bId = list.find((t) => t.title === "b")?.id;
    expect(bId).toBeTypeOf("number");

    const afterDelete = removeTodo(list, bId as number);
    const afterAdd = addTodo(afterDelete, "c");

    const cId = afterAdd.find((t) => t.title === "c")?.id;
    expect(cId).toBeTypeOf("number");
    expect(cId).not.toBe(bId);
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
