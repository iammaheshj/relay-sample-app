import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

test("Add an item", async ({ page }) => {
  await page.getByLabel("New item").fill("Pay rent");
  await page.getByRole("button", { name: "Add" }).click();
  await expect(page.getByRole("list", { name: "Items" })).toContainText("Pay rent");
  await expect(page.getByRole("status")).toHaveText("1 left to do");
});

test("Complete an item", async ({ page }) => {
  await page.getByLabel("New item").fill("Pay rent");
  await page.getByRole("button", { name: "Add" }).click();
  await page.getByRole("checkbox", { name: "Pay rent" }).check();
  await expect(page.getByRole("status")).toHaveText("0 left to do");
});

test("Delete an item", async ({ page }) => {
  await page.getByLabel("New item").fill("Pay rent");
  await page.getByRole("button", { name: "Add" }).click();
  await page.getByRole("button", { name: "Delete Pay rent" }).click();
  await expect(page.getByRole("list", { name: "Items" })).not.toContainText("Pay rent");
});

test("Mark an item as high priority", async ({ page }) => {
  await page.getByLabel("New item").fill("Pay rent");
  await page.getByRole("button", { name: "Add" }).click();

  await page.getByLabel("High priority").check();
  await expect(page.getByLabel("High priority")).toBeChecked();
  await expect(page.getByLabel("High priority")).toBeVisible();
});

test("High priority items sort first", async ({ page }) => {
  await page.getByLabel("New item").fill("Buy milk");
  await page.getByRole("button", { name: "Add" }).click();

  await page.getByLabel("New item").fill("Pay rent");
  await page.getByRole("button", { name: "Add" }).click();

  await page.getAllByLabel("High priority")[1].check();

  const items = page.getByRole("list", { name: "Items" }).getByRole("listitem");
  await expect(items.first()).toContainText("Pay rent");
});
