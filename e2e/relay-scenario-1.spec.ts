import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

test("Line breaks and repeated spaces become single spaces", async ({ page }) => {
  const rawTitle = "Buy   milk\n and  eggs";
  const tidiedTitle = "Buy milk and eggs";

  await page.getByLabel("New item").fill(rawTitle);
  await page.getByRole("button", { name: "Add" }).click();

  const newItem = page.getByRole("listitem").filter({ hasText: tidiedTitle });
  await expect(newItem).toHaveCount(1);

  // Assert the exact title text rendered for the new item (not including the Delete button text).
  await expect(newItem.getByText(tidiedTitle, { exact: true })).toBeVisible();

  // Assert the visible title contains no repeated spaces or line breaks.
  const titleText = await newItem.getByText(tidiedTitle, { exact: true }).textContent();
  expect(titleText).toBe(tidiedTitle);
  expect(titleText).not.toContain("\n");
  expect(titleText).not.toMatch(/\s{2,}/);
});
