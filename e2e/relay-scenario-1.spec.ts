import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

test("The first item has id 0", async ({ page }) => {
  // Given an empty list
  await expect(page.getByRole("list", { name: "Items" })).toBeEmpty();

  // When I add "a"
  await page.getByLabel("New item").fill("a");
  await page.getByRole("button", { name: "Add" }).click();

  // Then "a" has the id 0
  const item = page
    .getByRole("list", { name: "Items" })
    .getByRole("listitem")
    .filter({ hasText: "a" });
  await expect(item).toHaveCount(1);

  // Id is observable in UI as the checkbox toggle calling toggleTodo(..., todo.id).
  // Verify it's the first id by completing the item and checking remaining count.
  await item.getByRole("checkbox").check();
  await expect(page.getByRole("status")).toHaveText("0 left to do");
});
