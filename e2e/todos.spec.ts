import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

test("Add an item", async ({ page }) => {
  await page.getByLabel("New item").fill("Pay rent");
  await page.getByRole("button", { name: "Add" }).click();
  await expect(page.getByRole("list", { name: "Items" })).toContainText("Pay rent");
  await expect(page.getByRole("status")).toHaveText("1 left to do, 0 done");
});

test("Complete an item", async ({ page }) => {
  await page.getByLabel("New item").fill("Pay rent");
  await page.getByRole("button", { name: "Add" }).click();
  await page.getByRole("checkbox").check();
  await expect(page.getByRole("status")).toHaveText("0 left to do, 1 done");
});

test("Delete an item", async ({ page }) => {
  await page.getByLabel("New item").fill("Pay rent");
  await page.getByRole("button", { name: "Add" }).click();
  await page.getByRole("button", { name: "Delete Pay rent" }).click();
  await expect(page.getByRole("list", { name: "Items" })).not.toContainText("Pay rent");
});

test("Show the done count", async ({ page }) => {
  await page.getByLabel("New item").fill("a");
  await page.getByRole("button", { name: "Add" }).click();
  await page.getByLabel("New item").fill("b");
  await page.getByRole("button", { name: "Add" }).click();

  await page.getByRole("checkbox", { name: "a" }).check();

  await expect(page.getByRole("status")).toContainText("1 done");
});
