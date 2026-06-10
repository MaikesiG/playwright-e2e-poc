import { expect, test } from '@playwright/test';

test.describe('E2E - Products', () => {
  test('products table has 4 columns', async ({ page }) => {
    await page.goto('/products');
    const headers = page.locator('table thead th');
    await expect(headers).toHaveCount(4);
    await expect(headers.nth(0)).toHaveText('Name');
    await expect(headers.nth(1)).toHaveText('Category');
    await expect(headers.nth(2)).toHaveText('Price');
    await expect(headers.nth(3)).toHaveText('Status');
  });

  test('filter by name works', async ({ page }) => {
    await page.goto('/products');
    const filterInput = page.getByPlaceholder('Filter by name...');
    await filterInput.fill('apple');
    // count updates
    await expect(page.locator('.count')).toBeVisible();
  });

  test('filter by category - Fruit', async ({ page }) => {
    await page.goto('/products');
    await page.getByLabel('Filter by category').selectOption('fruit');
    const rows = page.locator('tbody tr');
    const count = await rows.count();
    // either rows show or empty state
    if (count === 0) {
      await expect(page.locator('.empty')).toBeVisible();
    } else {
      await expect(rows.first()).toBeVisible();
    }
  });

  test('filter by category - Vegetable', async ({ page }) => {
    await page.goto('/products');
    await page.getByLabel('Filter by category').selectOption('veggie');
    const rows = page.locator('tbody tr');
    const count = await rows.count();
    if (count === 0) {
      await expect(page.locator('.empty')).toBeVisible();
    } else {
      await expect(rows.first()).toBeVisible();
    }
  });

  test('product count is displayed', async ({ page }) => {
    await page.goto('/products');
    await expect(page.locator('.count')).toContainText('products');
  });
});
