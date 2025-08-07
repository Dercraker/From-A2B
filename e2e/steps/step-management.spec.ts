import { expect, test } from "@playwright/test";

test.describe("Step Management", () => {
  test.beforeEach(async ({ page }) => {
    // Setup: Login, org, and trip
    await page.goto("/orgs/test-org/trips/test-trip");
  });

  test("should add a new step", async ({ page }) => {
    await page.click('[data-testid="add-step-button"]');

    await page.fill('[name="name"]', "Visit Eiffel Tower");
    await page.fill('[name="description"]', "Take photos at the tower");
    await page.fill('[name="startDate"]', "2024-06-01T10:00");
    await page.fill('[name="endDate"]', "2024-06-01T12:00");
    await page.click('button[type="submit"]');

    await expect(page.locator("text=Visit Eiffel Tower")).toBeVisible();
  });

  test("should reorder steps via drag and drop", async ({ page }) => {
    const step1 = page.locator('[data-testid="step-item"]').first();
    const step2 = page.locator('[data-testid="step-item"]').nth(1);

    await step1.dragTo(step2);

    // Verify order changed
    await expect(
      page.locator('[data-testid="step-item"]').first(),
    ).toHaveAttribute("data-rank", "2");
  });
});
