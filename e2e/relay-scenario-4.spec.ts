import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

test("Invalid email shows an alert and does not create a user", async ({ page }) => {
  const usersList = page.getByRole("list", { name: "Users" });

  await page.getByLabel("Name").fill("Ada Lovelace");
  await page.getByLabel("Email").fill("not-an-email");
  await page.getByRole("button", { name: "Create user" }).click();

  await expect(page.getByRole("alert")).toHaveText("Email is invalid");
  await expect(usersList).not.toContainText("Ada Lovelace (not-an-email)");
});
