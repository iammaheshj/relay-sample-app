import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

test("Delete an employee record", async ({ page }) => {
  await expect(page.getByRole("heading", { name: "Employees" })).toBeVisible();

  // Given an employee named "Alex Kim" exists
  await page.getByLabel("First Name").first().fill("Alex");
  await page.getByLabel("Last Name").first().fill("Kim");
  await page.getByRole("button", { name: "Save employee" }).click();

  // When I delete the employee record for "Alex Kim"
  await page.getByRole("button", { name: "Open Alex Kim" }).click();
  await page.getByRole("button", { name: "Delete employee" }).click();
  await page.getByRole("button", { name: "Confirm delete" }).click();

  // Then I should not see "Alex Kim" in the employee list
  await expect(page.getByRole("list", { name: "Employees" })).not.toContainText("Alex Kim");
});
