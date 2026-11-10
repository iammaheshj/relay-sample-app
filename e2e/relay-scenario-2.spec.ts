import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

test("Name is required and blank name does not create a user", async ({ page }) => {
  const usersList = page.getByRole("list", { name: "Users" });

  await expect(usersList.getByRole("listitem")).toHaveCount(0);

  await page.getByLabel("Name").fill("   ");
  await page.getByLabel("Email").fill("ada@example.com");
  await page.getByRole("button", { name: "Create user" }).click();

  await expect(page.getByRole("alert")).toHaveText("Name is required");
  await expect(usersList.getByRole("listitem")).toHaveCount(0);
  await expect(usersList).not.toContainText("Ada Lovelace (ada@example.com)");
});
