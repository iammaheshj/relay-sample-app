import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

test("View an existing employee record", async ({ page }) => {
  await expect(page.getByRole("heading", { name: "Employees" })).toBeVisible();

  // Given an employee named "Alex Kim" exists
  await page.getByRole("textbox", { name: "First Name" }).fill("Alex");
  await page.getByRole("textbox", { name: "Last Name" }).fill("Kim");
  await page.getByRole("button", { name: "Save employee" }).click();
  await expect(page.getByRole("list", { name: "Employees" })).toContainText("Alex Kim");

  // When I open the employee record for "Alex Kim"
  await page.getByRole("button", { name: "Open Alex Kim" }).click();

  // Then I should see the employee details for "Alex Kim"
  const details = page.getByRole("region", { name: "Employee details" });
  await expect(details.getByRole("heading", { level: 3, name: "Alex Kim" })).toBeVisible();
  await expect(details.getByRole("textbox", { name: "First Name" })).toHaveValue("Alex");
  await expect(details.getByRole("textbox", { name: "Last Name" })).toHaveValue("Kim");
});
