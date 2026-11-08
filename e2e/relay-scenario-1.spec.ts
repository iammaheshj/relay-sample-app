import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

test("Mark an item as high priority", async ({ page }) => {
  await page.getByLabel("New item").fill("Pay rent");
  await page.getByRole("button", { name: "Add" }).click();

  const itemsList = page.getByRole("list", { name: "Items" });
  const payRentItem = itemsList.getByRole("listitem").filter({ hasText: "Pay rent" });
  await expect(payRentItem).toHaveCount(1);

  await payRentItem.getByLabel("High priority").check();

  // Acceptance: the item shows a high priority label.
  await expect(payRentItem.getByLabel("High priority")).toBeChecked();
  await expect(payRentItem.getByLabel("High priority")).toBeVisible();

  const priorityBadge = payRentItem.getByLabel("High priority").locator(
    "xpath=../span[@aria-label='High priority']",
  );
  await expect(priorityBadge).toHaveText("High priority");
});
