import { expect, test } from '@playwright/test';

test.describe('Smoke - Homepage', () => {
  test('page loads with correct title', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/Playwright/);
  });

  test('main heading is visible', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('h1').first()).toBeVisible();
  });

  test('Get Started button is visible', async ({ page }) => {
    await page.goto('/');
    const getStarted = page.getByRole('link', { name: 'Get started' });
    await expect(getStarted).toBeVisible();
  });

  test('Docs nav link exists', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('link', { name: 'Docs' })).toBeVisible();
  });
});
