import { expect, test } from "@playwright/test";

test.describe("Trip Management", () => {
  test.beforeEach(async ({ page }) => {
    // Setup: Login and navigate to org
    await page.goto("/orgs/test-org");
  });

  test("should create a new trip", async ({ page }) => {
    await page.click('[data-testid="add-trip-button"]');

    await page.fill('[name="name"]', "Paris Vacation");
    await page.fill('[name="description"]', "Weekend in Paris");
    await page.fill('[name="startDate"]', "2024-06-01");
    await page.fill('[name="endDate"]', "2024-06-03");
    await page.click('button[type="submit"]');

    await expect(page.locator("text=Paris Vacation")).toBeVisible();
  });

  test("should edit an existing trip", async ({ page }) => {
    await page.click('[data-testid="trip-item"]');
    await page.click('[data-testid="edit-trip-button"]');

    await page.fill('[name="name"]', "Updated Trip Name");
    await page.click('button[type="submit"]');

    await expect(page.locator("text=Updated Trip Name")).toBeVisible();
  });
});
