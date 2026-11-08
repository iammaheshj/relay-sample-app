import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

test("High priority items sort first", async ({ page }) => {
  await page.getByLabel("New item").fill("Buy milk");
  await page.getByRole("button", { name: "Add" }).click();

  await page.getByLabel("New item").fill("Pay rent");
  await page.getByRole("button", { name: "Add" }).click();

  const itemsList = page.getByRole("list", { name: "Items" });

  const payRentItem = itemsList.getByRole("listitem").filter({ hasText: "Pay rent" });
  await expect(payRentItem).toHaveCount(1);
  await payRentItem.getByLabel("High priority").check();

  const firstItem = itemsList.getByRole("listitem").first();
  await expect(firstItem).toContainText("Pay rent");

  // Ensure it really moved ahead of the other item.
  const allItemsText = await itemsList.getByRole("listitem").allTextContents();
  expect(allItemsText.length).toBe(2);
  expect(allItemsText[0]).toContain("Pay rent");
  expect(allItemsText[1]).toContain("Buy milk");
});
