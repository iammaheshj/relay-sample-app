import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

test("Mark an item as high priority", async ({ page }) => {
  // Given I have an item "Pay rent" in my list
  await page.getByLabel("New item").fill("Pay rent");
  await page.getByRole("button", { name: "Add" }).click();

  const payRentItem = page.getByRole("listitem").filter({ hasText: "Pay rent" });

  // When I mark "Pay rent" as high priority
  const payRentPriorityToggle = payRentItem.getByRole("checkbox").nth(1);
  await expect(payRentPriorityToggle).not.toBeChecked();
  await payRentPriorityToggle.check();

  // Then "Pay rent" shows a high priority label
  await expect(payRentPriorityToggle).toBeChecked();
  await expect(payRentItem.getByTitle("High priority")).toBeVisible();
  await expect(payRentItem.getByLabel("High priority", { exact: true }).nth(1)).toBeVisible();
});
