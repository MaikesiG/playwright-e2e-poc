import { expect, test } from '@playwright/test';

test('homepage loads', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { name: 'My App' })).toBeVisible();
});

test('search input is visible', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByPlaceholder('Search...')).toBeVisible();
  await expect(page.getByRole('button', { name: 'Submit' })).toBeVisible();
});

test('search and submit shows result', async ({ page }) => {
  await page.goto('/');
  await page.getByPlaceholder('Search...').fill('locator');
  await page.getByRole('button', { name: 'Submit' }).click();
  await expect(page.getByText('Results for: locator')).toBeVisible();
});

test('empty search shows error', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Submit' }).click();
  await expect(page.getByText('Please enter a keyword')).toBeVisible();
});
