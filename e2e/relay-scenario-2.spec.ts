import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

test("View an existing employee record", async ({ page }) => {
  await expect(page.getByRole("heading", { name: "Employees" })).toBeVisible();

  // Given an employee named "Alex Kim" exists
  await page.getByLabel("First Name").first().fill("Alex");
  await page.getByLabel("Last Name").first().fill("Kim");
  await page.getByRole("button", { name: "Save employee" }).click();

  // When I open the employee record for "Alex Kim"
  await page.getByRole("button", { name: "Open Alex Kim" }).click();

  // Then I should see the employee details for "Alex Kim"
  const details = page.getByRole("region", { name: "Employee details" });
  await expect(details).toContainText("Alex Kim");
  await expect(details.getByLabel("First Name")).toHaveValue("Alex");
  await expect(details.getByLabel("Last Name")).toHaveValue("Kim");
});
