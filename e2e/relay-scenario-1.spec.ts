import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

test("Mark an item as high priority", async ({ page }) => {
  // Given I have an item "Pay rent" in my list
  await page.getByLabel("New item").fill("Pay rent");
  await page.getByRole("button", { name: "Add" }).click();

  const payRentItem = page.getByRole("listitem").filter({ hasText: "Pay rent" });

  // Sanity check: the item exists and is not already labelled high priority.
  await expect(payRentItem).toContainText("Pay rent");
  await expect(payRentItem.getByLabel("High priority")).not.toBeChecked();
  await expect(payRentItem.getByLabel("High priority", { exact: true })).toBeVisible();
  await expect(payRentItem.getByLabel("High priority")).not.toHaveAttribute(
    "aria-label",
    "High priority",
  );

  // When I mark "Pay rent" as high priority
  await payRentItem.getByLabel("High priority").check();

  // Then "Pay rent" shows a high priority label
  await expect(payRentItem.getByLabel("High priority")).toBeChecked();
  await expect(payRentItem.getByLabel("High priority")).toBeVisible();
});
