import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

test("A long title is cut to 100 characters", async ({ page }) => {
  const longTitle = "a".repeat(150);

  await page.getByLabel("New item").fill(longTitle);
  await page.getByRole("button", { name: "Add" }).click();

  const items = page.getByRole("list", { name: "Items" });
  const titleSpan = items.locator("li").first().locator("span");

  await expect(titleSpan).toHaveText("a".repeat(100));
  await expect(titleSpan).not.toHaveText(longTitle);
});
