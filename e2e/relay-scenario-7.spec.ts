import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

test("Duplicate email is rejected and does not create a second user", async ({ page }) => {
  const usersList = page.getByRole("list", { name: "Users" });

  await page.getByLabel("Name").fill("Ada Lovelace");
  await page.getByLabel("Email").fill("ada@example.com");
  await page.getByRole("button", { name: "Create user" }).click();

  await page.getByLabel("Name").fill("Ada Lovelace");
  await page.getByLabel("Email").fill("ada@example.com");
  await page.getByRole("button", { name: "Create user" }).click();

  await expect(page.getByRole("alert")).toHaveText("Email already exists");
  await expect(usersList.getByText("Ada Lovelace (ada@example.com)")).toHaveCount(1);
});
