export async function login(page, username, password) {

  await page.waitForSelector('input[name="username"]');

  await page.fill('input[name="username"]', username);
  await page.fill('input[name="password"]', password);

  await page.click('button[type="submit"]');

  // tunggu proses login selesai
  await page.waitForLoadState('networkidle');
}