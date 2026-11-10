import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

test("Email is required and blank email does not create a user", async ({ page }) => {
  const usersList = page.getByRole("list", { name: "Users" });

  await page.getByLabel("Name").fill("Ada Lovelace");
  await page.getByLabel("Email").fill("   ");
  await page.getByRole("button", { name: "Create user" }).click();

  await expect(page.getByRole("alert")).toHaveText("Email is required");
  await expect(usersList).not.toContainText("Ada Lovelace (ada@example.com)");
});
