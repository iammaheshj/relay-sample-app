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

  // When I mark "Pay rent" as high priority
  const priorityCheckbox = payRentItem
    .getByRole("checkbox", { name: "High priority" })
    .first();
  await priorityCheckbox.check();

  // Then "Pay rent" shows a high priority label
  await expect(priorityCheckbox).toBeChecked();

  const priorityLabel = payRentItem.getByLabel("High priority").locator("span");
  await expect(priorityLabel).toHaveCount(1);
  await expect(priorityLabel).toHaveText("High priority");
});
