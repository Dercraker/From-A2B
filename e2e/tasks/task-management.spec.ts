import { test, expect } from "@playwright/test";

test.describe("Task Management", () => {
  test.beforeEach(async ({ page }) => {
    // Setup: Login, org, trip, and step
    await page.goto(
      "/orgs/test-org/trips/test-trip/details/steps/test-step/scheduling",
    );
  });

  test("should add a new task", async ({ page }) => {
    await page.click('[data-testid="add-task-button"]');

    await page.fill('[name="title"]', "Buy museum tickets");
    await page.fill('[name="notes"]', "Book online in advance");
    await page.fill('[name="dueDate"]', "2024-05-30T14:00");
    await page.click('button[type="submit"]');

    await expect(page.locator("text=Buy museum tickets")).toBeVisible();
  });

  test("should update task status", async ({ page }) => {
    await page.click('[data-testid="task-item"]');
    await page.click('[data-testid="status-dropdown"]');
    await page.click("text=In Progress");

    await expect(page.locator('[data-testid="task-status"]')).toHaveText(
      "In Progress",
    );
  });
});
