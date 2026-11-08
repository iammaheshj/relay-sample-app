import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

test("Clear completed removes only done items", async ({ page }) => {
  // Given I have items "a" and "b", and "a" is done
  await page.getByLabel("New item").fill("a");
  await page.getByRole("button", { name: "Add" }).click();
  await page.getByLabel("New item").fill("b");
  await page.getByRole("button", { name: "Add" }).click();

  const items = page.getByRole("list", { name: "Items" });
  await expect(items).toContainText(["a", "b"]);

  await page.getByRole("listitem").filter({ hasText: "a" }).getByRole("checkbox").check();
  await expect(page.getByRole("status")).toHaveText("1 left to do");

  // When I choose "Clear completed"
  const clearCompleted = page.getByRole("button", { name: "Clear completed" });
  await expect(clearCompleted).toBeVisible();
  await clearCompleted.click();

  // Then only "b" is in the list
  await expect(items).toContainText("b");
  await expect(items).not.toContainText("a");
  await expect(page.getByRole("listitem")).toHaveCount(1);
  await expect(page.getByRole("listitem")).toContainText(["b"]);

  // And the clear button should no longer be shown (no completed items remain)
  await expect(page.getByRole("button", { name: "Clear completed" })).toHaveCount(0);
  await expect(page.getByRole("status")).toHaveText("1 left to do");
});
