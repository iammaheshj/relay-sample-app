import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

test("Delete an employee record", async ({ page }) => {
  await expect(page.getByRole("heading", { name: "Employees" })).toBeVisible();

  // Given an employee named "Alex Kim" exists
  await page.getByRole("textbox", { name: "First Name" }).fill("Alex");
  await page.getByRole("textbox", { name: "Last Name" }).fill("Kim");
  await page.getByRole("button", { name: "Save employee" }).click();
  await expect(page.getByRole("list", { name: "Employees" })).toContainText("Alex Kim");

  // When I delete the employee record for "Alex Kim"
  await page.getByRole("button", { name: "Open Alex Kim" }).click();
  const details = page.getByRole("region", { name: "Employee details" });
  await expect(details.getByRole("heading", { level: 3, name: "Alex Kim" })).toBeVisible();

  await page.getByRole("button", { name: "Delete employee" }).click();
  await page.getByRole("button", { name: "Confirm delete" }).click();

  // Then I should not see "Alex Kim" in the employee list
  await expect(page.getByRole("list", { name: "Employees" })).not.toContainText("Alex Kim");
  await expect(details).toContainText("Select an employee to view details.");
});
