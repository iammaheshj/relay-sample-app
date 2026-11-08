import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

test("Mark an item as high priority", async ({ page }) => {
  // Given I have an item "Pay rent" in my list
  await page.getByLabel("New item").fill("Pay rent");
  await page.getByRole("button", { name: "Add" }).click();

  const itemsList = page.getByRole("list", { name: "Items" });
  await expect(itemsList).toContainText("Pay rent");

  // When I mark "Pay rent" as high priority
  const payRentItem = page.getByRole("listitem").filter({ hasText: "Pay rent" });
  await payRentItem.getByRole("checkbox", { name: "High priority" }).check();

  // Then "Pay rent" shows a high priority label
  await expect(payRentItem.getByLabel("High priority")).toBeVisible();
  await expect(payRentItem.getByLabel("High priority")).toHaveText("High priority");
});
