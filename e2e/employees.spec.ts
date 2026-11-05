import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

test("Create an employee record from the form", async ({ page }) => {
  await expect(page.getByRole("heading", { name: "Employees" })).toBeVisible();

  await page.getByLabel("First Name").first().fill("Alex");
  await page.getByLabel("Last Name").first().fill("Kim");
  await page.getByRole("button", { name: "Save employee" }).click();

  await expect(page.getByRole("list", { name: "Employees" })).toContainText("Alex Kim");
});

test("View an existing employee record", async ({ page }) => {
  await page.getByLabel("First Name").first().fill("Alex");
  await page.getByLabel("Last Name").first().fill("Kim");
  await page.getByRole("button", { name: "Save employee" }).click();

  await page.getByRole("button", { name: "Open Alex Kim" }).click();
  await expect(page.getByRole("region", { name: "Employee details" })).toContainText("Alex Kim");

  // There are two "First Name" / "Last Name" inputs (create + details). Scope to details.
  const details = page.getByRole("region", { name: "Employee details" });
  await expect(details.getByLabel("First Name")).toHaveValue("Alex");
  await expect(details.getByLabel("Last Name")).toHaveValue("Kim");
});

test("Update an employee record from the form", async ({ page }) => {
  await page.getByLabel("First Name").first().fill("Alex");
  await page.getByLabel("Last Name").first().fill("Kim");
  await page.getByRole("button", { name: "Save employee" }).click();

  await page.getByRole("button", { name: "Open Alex Kim" }).click();

  const details = page.getByRole("region", { name: "Employee details" });
  await details.getByLabel("Last Name").fill("Kumar");
  await page.getByRole("button", { name: "Save changes" }).click();

  await expect(details).toContainText("Alex Kumar");
  await expect(page.getByRole("list", { name: "Employees" })).toContainText("Alex Kumar");
});

test("Delete an employee record", async ({ page }) => {
  await page.getByLabel("First Name").first().fill("Alex");
  await page.getByLabel("Last Name").first().fill("Kim");
  await page.getByRole("button", { name: "Save employee" }).click();

  await page.getByRole("button", { name: "Open Alex Kim" }).click();
  await page.getByRole("button", { name: "Delete employee" }).click();

  await page.getByRole("button", { name: "Confirm delete" }).click();
  await expect(page.getByRole("list", { name: "Employees" })).not.toContainText("Alex Kim");
});
