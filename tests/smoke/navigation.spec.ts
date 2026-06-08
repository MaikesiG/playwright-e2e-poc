import { expect, test } from '@playwright/test';

test.describe('Smoke - Navigation', () => {
  test('Docs link navigates to docs page', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('link', { name: 'Docs' }).first().click();
    await expect(page).toHaveURL(/docs/);
  });

  test('API page loads successfully', async ({ page }) => {
    await page.goto('/docs/api/class-playwright');
    await expect(page.locator('h1').first()).toBeVisible();
  });

  test('logo navigates back to homepage', async ({ page }) => {
    await page.goto('/docs/intro');
    await page.locator('a.navbar__brand').click();
    await expect(page).toHaveURL('https://playwright.dev/');
  });
});
