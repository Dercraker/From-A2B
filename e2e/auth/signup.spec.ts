import { expect, test } from "@playwright/test";

test.describe("User Registration", () => {
  test("should register a new user successfully", async ({ page }) => {
    await page.goto("/auth/signup");

    await page.fill('[name="email"]', "test@example.com");
    await page.fill('[name="name"]', "Test User");
    await page.click('button[type="submit"]');

    await expect(page).toHaveURL(/\/orgs\/new/);
  });

  test("should show validation errors for invalid email", async ({ page }) => {
    await page.goto("/auth/signup");

    await page.fill('[name="email"]', "invalid-email");
    await page.click('button[type="submit"]');

    await expect(page.locator('[data-testid="email-error"]')).toBeVisible();
  });
});
