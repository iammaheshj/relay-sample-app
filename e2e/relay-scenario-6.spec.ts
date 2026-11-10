import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

test("Email is trimmed and lowercased before being displayed in the Users list", async ({ page }) => {
  const usersList = page.getByRole("list", { name: "Users" });

  await page.getByLabel("Name").fill("Ada Lovelace");
  await page.getByLabel("Email").fill("  ADA@EXAMPLE.COM  ");
  await page.getByRole("button", { name: "Create user" }).click();

  await expect(usersList.getByRole("listitem")).toHaveCount(1);

  const itemText = await usersList.getByRole("listitem").first().textContent();
  expect(itemText).toBe("Ada Lovelace (ada@example.com)");
});
