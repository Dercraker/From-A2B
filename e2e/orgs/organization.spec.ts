import { expect, test } from "@playwright/test";

test.describe("Organization Management", () => {
  test.beforeEach(async ({ page }) => {
    // Setup: Login and create org
    await page.goto("/auth/signin");
    await page.fill('[name="email"]', "test@example.com");
    await page.click('button[type="submit"]');
  });

  test("should create a new organization", async ({ page }) => {
    await page.goto("/orgs/new");

    await page.fill('[name="name"]', "Test Organization");
    await page.fill('[name="slug"]', "test-org");
    await page.fill('[name="email"]', "org@test.com");
    await page.click('button[type="submit"]');

    await expect(page).toHaveURL(/\/orgs\/test-org/);
  });

  test("should navigate to organization dashboard", async ({ page }) => {
    await page.goto("/orgs/test-org");

    await expect(page.locator("h1")).toContainText("Dashboard");
  });
});
