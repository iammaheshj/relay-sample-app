import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

test("Nothing left to do", async ({ page }) => {
  // Given every item is done
  await page.getByLabel("New item").fill("Pay rent");
  await page.getByRole("button", { name: "Add" }).click();

  await expect(page.getByRole("list", { name: "Items" })).toContainText("Pay rent");

  await page.getByRole("checkbox", { name: "Pay rent" }).check();

  // Then the status says "Nothing left to do"
  await expect(page.getByRole("status")).toHaveText("Nothing left to do");
});
