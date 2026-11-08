import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

test("Line breaks and repeated spaces become single spaces", async ({ page }) => {
  const input = page.getByLabel("New item");
  const addButton = page.getByRole("button", { name: "Add" });

  await input.fill("Buy   milk\n and  eggs");
  await addButton.click();

  const itemsList = page.getByRole("list", { name: "Items" });
  const addedItem = itemsList.getByRole("listitem").filter({ hasText: "Buy milk and eggs" });

  await expect(addedItem).toHaveCount(1);

  // Ensure we didn't keep the messy whitespace in the rendered title.
  const itemText = (await addedItem.first().textContent()) ?? "";
  expect(itemText).toContain("Buy milk and eggs");
  expect(itemText).not.toContain("  ");
  expect(itemText).not.toContain("\n");
});
