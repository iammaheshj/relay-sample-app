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

  const itemA = page.getByRole("listitem").filter({ hasText: /^\s*a\s*/ });
  const itemB = page.getByRole("listitem").filter({ hasText: /^\s*b\s*/ });

  await expect(itemA).toHaveCount(1);
  await expect(itemB).toHaveCount(1);

  await itemA.getByRole("checkbox").check();
  await expect(page.getByRole("status")).toHaveText("1 left to do");

  // When I choose "Clear completed"
  const clearCompleted = page.getByRole("button", { name: "Clear completed" });
  await expect(clearCompleted).toBeVisible();
  await clearCompleted.click();

  // Then only "b" is in the list
  await expect(page.getByRole("listitem")).toHaveCount(1);
  await expect(page.getByRole("listitem")).toContainText(["b"]);
  await expect(page.getByRole("listitem")).not.toContainText(["a"]);

  await expect(page.getByRole("button", { name: "Clear completed" })).toHaveCount(0);
  await expect(page.getByRole("status")).toHaveText("1 left to do");
});
