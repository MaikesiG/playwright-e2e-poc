import { expect, test } from '@playwright/test';

test.describe('Smoke - Angular App', () => {
  test('homepage loads with correct heading', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('h1').first()).toHaveText('Welcome to MyApp');
  });

  test('subtitle is visible', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('.subtitle')).toHaveText(
      'Search, explore and manage your products',
    );
  });

  test('search input is visible', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByPlaceholder('Search products...')).toBeVisible();
  });

  test('search button is visible', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('button', { name: 'Search' })).toBeVisible();
  });

  test('login form is visible', async ({ page }) => {
    await page.goto('/login');
    await expect(page.getByPlaceholder('you@example.com')).toBeVisible();
    await expect(page.getByPlaceholder('Enter password')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Login' })).toBeVisible();
  });

  test('products table is visible', async ({ page }) => {
    await page.goto('/products');
    await expect(page.locator('table')).toBeVisible();
  });
});
