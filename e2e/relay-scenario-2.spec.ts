import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

test("High priority items sort first", async ({ page }) => {
  // Given I have items "Buy milk" and "Pay rent"
  await page.getByLabel("New item").fill("Buy milk");
  await page.getByRole("button", { name: "Add" }).click();
  await page.getByLabel("New item").fill("Pay rent");
  await page.getByRole("button", { name: "Add" }).click();

  const itemsList = page.getByRole("list", { name: "Items" });
  const items = itemsList.getByRole("listitem");

  // Sanity check initial order is insertion order (no priority yet).
  await expect(items.nth(0)).toContainText("Buy milk");
  await expect(items.nth(1)).toContainText("Pay rent");

  // When I mark "Pay rent" as high priority
  const payRentItem = items.filter({ hasText: "Pay rent" });
  await payRentItem.getByRole("checkbox").nth(1).check();

  // Then "Pay rent" is first in the list
  await expect(items.first()).toContainText("Pay rent");
  await expect(items.nth(1)).toContainText("Buy milk");
});
