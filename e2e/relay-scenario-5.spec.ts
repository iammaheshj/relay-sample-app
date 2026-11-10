import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

test("Name is trimmed before being displayed in the Users list", async ({ page }) => {
  const usersList = page.getByRole("list", { name: "Users" });

  await page.getByLabel("Name").fill("  Ada Lovelace  ");
  await page.getByLabel("Email").fill("ada@example.com");
  await page.getByRole("button", { name: "Create user" }).click();

  await expect(usersList).toContainText("Ada Lovelace (ada@example.com)");
});
