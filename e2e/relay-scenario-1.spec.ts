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
  // Observable in the DOM via the <li> key/id used by React list logic.
  const item = page.getByRole("list", { name: "Items" }).getByRole("listitem").filter({ hasText: "a" });
  await expect(item).toHaveCount(1);
  await expect(item.first()).toHaveAttribute("data-id", "0");
});
