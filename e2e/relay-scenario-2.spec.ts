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

  const list = page.getByRole("list", { name: "Items" });
  await expect(list).toContainText("Buy milk");
  await expect(list).toContainText("Pay rent");

  // When I mark "Pay rent" as high priority
  const payRentItem = page.getByRole("listitem").filter({ hasText: "Pay rent" });
  await payRentItem.getByRole("checkbox", { name: "High priority" }).check();

  // Then "Pay rent" is first in the list
  const firstItem = page.getByRole("listitem").first();
  await expect(firstItem).toContainText("Pay rent");
});
