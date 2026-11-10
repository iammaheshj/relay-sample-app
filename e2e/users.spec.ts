import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

test("Create a user with valid name and email adds the user to the Users list", async ({ page }) => {
  const usersList = page.getByRole("list", { name: "Users" });
  await expect(usersList).toBeVisible();

  await page.getByLabel("Name").fill("Ada Lovelace");
  await page.getByLabel("Email").fill("ada@example.com");
  await page.getByRole("button", { name: "Create user" }).click();

  await expect(usersList).toContainText("Ada Lovelace (ada@example.com)");
});

test("Name is required and blank name does not create a user", async ({ page }) => {
  const usersList = page.getByRole("list", { name: "Users" });

  await page.getByLabel("Name").fill("   ");
  await page.getByLabel("Email").fill("ada@example.com");
  await page.getByRole("button", { name: "Create user" }).click();

  await expect(page.getByRole("alert")).toHaveText("Name is required");
  await expect(usersList).not.toContainText("Ada Lovelace (ada@example.com)");
});

test("Email is required and blank email does not create a user", async ({ page }) => {
  const usersList = page.getByRole("list", { name: "Users" });

  await page.getByLabel("Name").fill("Ada Lovelace");
  await page.getByLabel("Email").fill("   ");
  await page.getByRole("button", { name: "Create user" }).click();

  await expect(page.getByRole("alert")).toHaveText("Email is required");
  await expect(usersList).not.toContainText("Ada Lovelace (ada@example.com)");
});

test("Invalid email shows an alert and does not create a user", async ({ page }) => {
  const usersList = page.getByRole("list", { name: "Users" });

  await page.getByLabel("Name").fill("Ada Lovelace");
  await page.getByLabel("Email").fill("not-an-email");
  await page.getByRole("button", { name: "Create user" }).click();

  await expect(page.getByRole("alert")).toHaveText("Email is invalid");
  await expect(usersList).not.toContainText("Ada Lovelace (not-an-email)");
});

test("Name is trimmed before being displayed in the Users list", async ({ page }) => {
  const usersList = page.getByRole("list", { name: "Users" });

  await page.getByLabel("Name").fill("  Ada Lovelace  ");
  await page.getByLabel("Email").fill("ada@example.com");
  await page.getByRole("button", { name: "Create user" }).click();

  await expect(usersList).toContainText("Ada Lovelace (ada@example.com)");
});

test("Email is trimmed and lowercased before being displayed in the Users list", async ({ page }) => {
  const usersList = page.getByRole("list", { name: "Users" });

  await page.getByLabel("Name").fill("Ada Lovelace");
  await page.getByLabel("Email").fill("  ADA@EXAMPLE.COM  ");
  await page.getByRole("button", { name: "Create user" }).click();

  await expect(usersList).toContainText("Ada Lovelace (ada@example.com)");
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
