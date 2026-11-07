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
  await page.getByRole("checkbox").check();
  await expect(page.getByRole("status")).toHaveText("0 left to do");
});

test("Delete an item", async ({ page }) => {
  await page.getByLabel("New item").fill("Pay rent");
  await page.getByRole("button", { name: "Add" }).click();
  await page.getByRole("button", { name: "Delete Pay rent" }).click();
  await expect(page.getByRole("list", { name: "Items" })).not.toContainText("Pay rent");
});

test("Clear completed removes only done items", async ({ page }) => {
  await page.getByLabel("New item").fill("a");
  await page.getByRole("button", { name: "Add" }).click();
  await page.getByLabel("New item").fill("b");
  await page.getByRole("button", { name: "Add" }).click();

  await page.getByRole("checkbox").first().check();

  await page.getByRole("button", { name: "Clear completed" }).click();

  await expect(page.getByRole("list", { name: "Items" })).toContainText("b");
  await expect(page.getByRole("list", { name: "Items" })).not.toContainText("a");

  // Button should disappear when there are no completed items.
  await expect(page.getByRole("button", { name: "Clear completed" })).toHaveCount(0);
});
