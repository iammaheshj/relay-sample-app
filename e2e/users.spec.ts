import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

test("Create a user", async ({ page }) => {
  await page.getByLabel("Name").fill("Ada Lovelace");
  await page.getByLabel("Email").fill("ada@example.com");
  await page.getByRole("button", { name: "Create user" }).click();

  await expect(page.getByRole("list", { name: "Users" })).toContainText("Ada Lovelace (ada@example.com)");
});

test("Show an error when the email is invalid", async ({ page }) => {
  await page.getByLabel("Name").fill("Ada Lovelace");
  await page.getByLabel("Email").fill("not-an-email");
  await page.getByRole("button", { name: "Create user" }).click();

  await expect(page.getByRole("alert")).toHaveText("Email is invalid");
  await expect(page.getByRole("list", { name: "Users" })).toBeEmpty();
});
