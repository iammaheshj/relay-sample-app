import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

test("Line breaks and repeated spaces become single spaces", async ({ page }) => {
  await page.getByLabel("New item").fill("Buy   milk\n and  eggs");
  await page.getByRole("button", { name: "Add" }).click();

  const items = page.getByRole("list", { name: "Items" });
  await expect(items).toContainText("Buy milk and eggs");
  await expect(items).not.toContainText("Buy   milk");

  // Ensure the rendered title contains no newline characters.
  await expect(items).not.toContainText(/\n/);
});
