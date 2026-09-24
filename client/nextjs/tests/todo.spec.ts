/**
 * End-to-end coverage for adding, filtering, completing, and persisting todos.
 */

import { expect, test } from "@playwright/test";

test("manages todos and persists preferences", async ({ page }) => {
  await page.goto("/");
  await page.evaluate(() => window.localStorage.clear());
  await page.reload();

  await page.getByRole("button", { name: "Add todo" }).first().click();
  await page.getByPlaceholder("Todo title").fill("Review browser coverage");
  await page.getByPlaceholder("Add a note (optional)").fill("Verify the Todo app in Chromium.");
  await page.getByLabel("Priority").selectOption("high");
  await page.locator("form").getByRole("button", { name: "Add todo" }).click();

  await expect(page.getByRole("heading", { name: "Review browser coverage" })).toBeVisible();
  await page.getByPlaceholder("Search todos...").fill("browser coverage");
  await expect(page.getByRole("heading", { name: "Review browser coverage" })).toBeVisible();

  await page.getByRole("button", { name: "Complete Review browser coverage" }).click();
  await page.getByRole("button", { name: "completed", exact: true }).click();
  await expect(page.getByRole("heading", { name: "Review browser coverage" })).toBeVisible();

  await page.getByRole("button", { name: "High contrast" }).click();
  await expect(page.getByRole("button", { name: "Standard contrast" })).toBeVisible();
  await page.reload();
  await expect(page.getByRole("button", { name: "Standard contrast" })).toBeVisible();
});
