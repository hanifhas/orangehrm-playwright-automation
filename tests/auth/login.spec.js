import { test, expect } from '@playwright/test';
import { login } from '../../utils/loginHelper';

test('Login with valid credentials', async ({ page }) => {

  await page.goto('https://opensource-demo.orangehrmlive.com/');

  await login(page, 'Admin', 'admin123');

  await expect(page.locator('h6')).toHaveText('Dashboard');

});

test('Login with wrong username', async ({ page }) => {
  await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');

  await page.getByPlaceholder('Username').fill('WrongUser');
  await page.getByPlaceholder('Password').fill('admin123');

  await page.getByRole('button', { name: 'Login' }).click();

  await expect(
    page.getByText('Invalid credentials')
  ).toBeVisible();
});

test('Login with wrong password', async ({ page }) => {

  await page.goto('https://opensource-demo.orangehrmlive.com/');

  await login(page, 'Admin', 'wrongpass');

  await expect(
  page.locator('.oxd-alert-content-text')
).toBeVisible();

});

test('Login with empty fields', async ({ page }) => {

  await page.goto('https://opensource-demo.orangehrmlive.com/');

  await page.click('button[type="submit"]');

  await expect(page.locator('text=Required').first()).toBeVisible();

});

test('Logout successfully', async ({ page }) => {
  await page.goto('https://opensource-demo.orangehrmlive.com/');

  // Login pakai helper
  await login(page, 'Admin', 'admin123');

  await page.waitForLoadState('networkidle');

  // Klik dropdown profile (lebih stabil)
  await page.locator('.oxd-userdropdown-name').click();

  // Klik logout
  await page.getByText('Logout').click();

  // Verifikasi kembali ke halaman login
  await expect(page).toHaveURL(/login/);
});

