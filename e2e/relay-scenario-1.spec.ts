import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

test("Create a user with valid name and email adds the user to the Users list", async ({ page }) => {
  const usersList = page.getByRole("list", { name: "Users" });

  // The list exists but may be empty/hidden depending on browser accessibility mapping.
  await expect(usersList).toBeAttached();
  await expect(usersList.getByRole("listitem")).toHaveCount(0);

  await page.getByLabel("Name").fill("Ada Lovelace");
  await page.getByLabel("Email").fill("ada@example.com");
  await page.getByRole("button", { name: "Create user" }).click();

  await expect(usersList.getByText("Ada Lovelace (ada@example.com)")).toHaveCount(1);
});
