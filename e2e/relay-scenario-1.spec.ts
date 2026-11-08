import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

test("Line breaks and repeated spaces become single spaces", async ({ page }) => {
  await page.getByLabel("New item").fill("Buy   milk\n and  eggs");
  await page.getByRole("button", { name: "Add" }).click();

  await expect(page.getByRole("list", { name: "Items" })).toContainText(
    "Buy milk and eggs",
  );

  // Ensure the raw, untidied title isn't shown.
  await expect(page.getByRole("list", { name: "Items" })).not.toContainText(
    "Buy   milk",
  );
});
