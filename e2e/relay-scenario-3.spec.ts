import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

test("Update an employee record from the form", async ({ page }) => {
  await expect(page.getByRole("heading", { name: "Employees" })).toBeVisible();

  // Given an employee named "Alex Kim" exists
  await page.getByRole("textbox", { name: "First Name" }).fill("Alex");
  await page.getByRole("textbox", { name: "Last Name" }).fill("Kim");
  await page.getByRole("button", { name: "Save employee" }).click();
  await expect(page.getByRole("list", { name: "Employees" })).toContainText("Alex Kim");

  // When I edit the employee record for "Alex Kim" to change Last Name to "Kumar" and save
  await page.getByRole("button", { name: "Open Alex Kim" }).click();
  const details = page.getByRole("region", { name: "Employee details" });
  await expect(details.getByRole("heading", { level: 3, name: "Alex Kim" })).toBeVisible();

  await details.getByRole("textbox", { name: "Last Name" }).fill("Kumar");
  await page.getByRole("button", { name: "Save changes" }).click();

  // Then I should see the employee record displayed as "Alex Kumar"
  await expect(details.getByRole("heading", { level: 3, name: "Alex Kumar" })).toBeVisible();
  await expect(page.getByRole("list", { name: "Employees" })).toContainText("Alex Kumar");
});
