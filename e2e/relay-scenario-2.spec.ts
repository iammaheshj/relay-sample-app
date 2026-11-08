import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

test("A blank name keeps the old one", async ({ page }) => {
  await page.getByLabel("New item").fill("Pay rent");
  await page.getByRole("button", { name: "Add" }).click();

  await page.getByLabel("Rename Pay rent").fill("   ");
  await page.getByLabel("Rename Pay rent").blur();

  await expect(page.getByRole("list", { name: "Items" })).toContainText("Pay rent");
});
