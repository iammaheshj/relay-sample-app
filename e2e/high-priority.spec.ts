import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

test("Mark an item as high priority", async ({ page }) => {
  await page.getByLabel("New item").fill("Pay rent");
  await page.getByRole("button", { name: "Add" }).click();

  await page.getByRole("listitem").filter({ hasText: "Pay rent" }).getByLabel("High priority").check();

  await expect(page.getByRole("listitem").filter({ hasText: "Pay rent" })).toContainText(
    "High priority",
  );
});

test("High priority items sort first", async ({ page }) => {
  await page.getByLabel("New item").fill("Buy milk");
  await page.getByRole("button", { name: "Add" }).click();
  await page.getByLabel("New item").fill("Pay rent");
  await page.getByRole("button", { name: "Add" }).click();

  await page.getByRole("listitem").filter({ hasText: "Pay rent" }).getByLabel("High priority").check();

  const items = page.getByRole("list", { name: "Items" }).getByRole("listitem");
  await expect(items.first()).toContainText("Pay rent");
});
