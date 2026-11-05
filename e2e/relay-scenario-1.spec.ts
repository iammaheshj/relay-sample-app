import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

test("Create an employee record from the form", async ({ page }) => {
  await expect(page.getByRole("heading", { name: "Employees" })).toBeVisible();

  await page.getByRole("textbox", { name: "First Name" }).fill("Alex");
  await page.getByRole("textbox", { name: "Last Name" }).fill("Kim");
  await page.getByRole("button", { name: "Save employee" }).click();

  await expect(page.getByRole("list", { name: "Employees" })).toContainText("Alex Kim");
});
