import { expect, test } from '@playwright/test';

test.describe('E2E - Docs Flow', () => {
  test('Get Started flow works end to end', async ({ page }) => {
    // 1. Land on homepage
    await page.goto('/');
    await expect(page).toHaveTitle(/Playwright/);

    // 2. Click Get Started
    await page.getByRole('link', { name: 'Get started' }).first().click();
    await expect(page).toHaveURL(/intro/);

    // 3. Intro page has content
    await expect(page.locator('h1').first()).toBeVisible();
    await expect(page.locator('article')).toBeVisible();
  });

  test('installation page has npm command', async ({ page }) => {
    await page.goto('/docs/intro');
    await expect(page.locator('code').first()).toBeVisible();
  });

  test('page has correct meta description', async ({ page }) => {
    await page.goto('/');
    const metaDesc = page.locator('meta[name="description"]');
    await expect(metaDesc).toHaveAttribute('content', /.+/);
  });
});
