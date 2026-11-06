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

test("Rename an item", async ({ page }) => {
  await page.getByLabel("New item").fill("Pay rnet");
  await page.getByRole("button", { name: "Add" }).click();

  page.once("dialog", async (dialog) => {
    await dialog.accept("Pay rent");
  });
  await page.getByRole("button", { name: "Rename Pay rnet" }).click();

  await expect(page.getByRole("list", { name: "Items" })).toContainText("Pay rent");
});

test("A blank name keeps the old one", async ({ page }) => {
  await page.getByLabel("New item").fill("Pay rent");
  await page.getByRole("button", { name: "Add" }).click();

  page.once("dialog", async (dialog) => {
    await dialog.accept("   ");
  });
  await page.getByRole("button", { name: "Rename Pay rent" }).click();

  await expect(page.getByRole("list", { name: "Items" })).toContainText("Pay rent");
});
