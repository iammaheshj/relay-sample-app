import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

test("Rename an item", async ({ page }) => {
  await page.getByLabel("New item").fill("Pay rnet");
  await page.getByRole("button", { name: "Add" }).click();

  await page.getByLabel("Rename Pay rnet").fill("Pay rent");
  await page.getByLabel("Rename Pay rnet").blur();

  await expect(page.getByRole("list", { name: "Items" })).toContainText("Pay rent");
});
