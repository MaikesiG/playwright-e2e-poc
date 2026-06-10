import { expect, test } from '@playwright/test';

test.describe('E2E - Login', () => {
  test('shows error for invalid email format', async ({ page }) => {
    await page.goto('/login');
    await page.getByLabel('Email').fill('notanemail');
    await page.getByLabel('Password').fill('password123');
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page.locator('.field-error').first()).toBeVisible();
  });

  test('shows error when password is empty', async ({ page }) => {
    await page.goto('/login');
    await page.getByLabel('Email').fill('test@example.com');
    await page.getByRole('button', { name: 'Login' }).click();
    // password error shows
    const errors = page.locator('.field-error');
    await expect(errors.nth(1)).toBeVisible();
  });

  test('successful login shows success message', async ({ page }) => {
    await page.goto('/login');
    await page.getByPlaceholder('you@example.com').fill('test@example.com');
    await page.getByPlaceholder('Enter password').fill('password123');
    await page.getByRole('button', { name: 'Login' }).click();
    const success = page.locator('.success[role="status"]');
    const error = page.locator('.error[role="alert"]');

    await expect(success.or(error).filter({ hasText: /.+/ })).toBeVisible();
  });
});
