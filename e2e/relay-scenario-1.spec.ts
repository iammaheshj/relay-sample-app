import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

test("Sample behaviour", async ({ page }) => {
  // Given a sample starting point
  await expect(page.getByRole("heading", { name: "To-do" })).toBeVisible();

  // When the user does the sample action
  await page.getByLabel("New item").fill("Sample item");
  await page.getByRole("button", { name: "Add" }).click();

  // Then the sample result is shown
  const items = page.getByRole("list", { name: "Items" });
  await expect(items).toContainText("Sample item");
  await expect(page.getByRole("status")).toHaveText("1 left to do");
});
