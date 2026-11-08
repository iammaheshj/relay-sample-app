import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

test("Line breaks and repeated spaces become single spaces", async ({ page }) => {
  const rawTitle = "Buy   milk\n and  eggs";
  const tidiedTitle = "Buy milk and eggs";

  await page.getByLabel("New item").fill(rawTitle);
  await page.getByRole("button", { name: "Add" }).click();

  const items = page.getByRole("list", { name: "Items" });

  // Acceptance criteria: the title shown is tidied.
  await expect(items).toContainText(tidiedTitle);

  // Ensure there is not a separate item still containing the raw spacing.
  // Note: the list includes each item's title and a "Delete" button label.
  const listItems = items.getByRole("listitem");
  await expect(listItems).toHaveCount(1);

  const item = listItems.first();
  await expect(item).toContainText(tidiedTitle);
  await expect(item).not.toContainText(rawTitle);
});
