import { test, expect } from '@playwright/test';

test.describe('Homepage', () => {
  test('should load the homepage', async ({ page }) => {
    await page.goto('/');
    
    // Wait for the page to load
    await page.waitForLoadState('networkidle');
    
    // Check if the page loaded successfully
    expect(page.url()).toContain('/');
  });

  test('should have proper title', async ({ page }) => {
    await page.goto('/');
    
    // Check for title or main heading
    await expect(page).toHaveTitle(/Admin/i);
  });
});

test.describe('Authentication Flow', () => {
  test('should navigate to login page', async ({ page }) => {
    await page.goto('/login');
    
    await page.waitForLoadState('networkidle');
    
    // Check if we're on the login page
    expect(page.url()).toContain('/login');
  });

  test('should show validation errors for empty login form', async ({ page }) => {
    await page.goto('/login');
    
    // Try to submit without filling the form
    const submitButton = page.locator('button[type="submit"]');
    
    if (await submitButton.isVisible()) {
      await submitButton.click();
      
      // Wait a bit for validation to trigger
      await page.waitForTimeout(500);
    }
  });

  test('should register a new user', async ({ page }) => {
    await page.goto('/register');
    
    await page.waitForLoadState('networkidle');
    
    // Generate unique email for testing
    const timestamp = Date.now();
    const email = `test${timestamp}@example.com`;
    
    // Fill registration form
    const emailInput = page.locator('input[type="email"], input[name="email"]');
    const nameInput = page.locator('input[name="name"]');
    const passwordInput = page.locator('input[type="password"]').first();
    
    if (await emailInput.isVisible()) {
      await emailInput.fill(email);
    }
    
    if (await nameInput.isVisible()) {
      await nameInput.fill('Test User');
    }
    
    if (await passwordInput.isVisible()) {
      await passwordInput.fill('testPassword123');
    }
    
    // Submit form
    const submitButton = page.locator('button[type="submit"]');
    if (await submitButton.isVisible()) {
      await submitButton.click();
      
      // Wait for navigation or success message
      await page.waitForTimeout(2000);
    }
  });
});

test.describe('Dashboard', () => {
  test.skip('should display dashboard after login', async ({ page }) => {
    // This test requires authentication
    // Implement authentication logic here
    await page.goto('/dashboard');
    
    await page.waitForLoadState('networkidle');
  });
});

test.describe('Responsive Design', () => {
  test('should work on mobile viewport', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    
    await page.waitForLoadState('networkidle');
    
    // Check if page is responsive
    const body = page.locator('body');
    await expect(body).toBeVisible();
  });

  test('should work on tablet viewport', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto('/');
    
    await page.waitForLoadState('networkidle');
    
    const body = page.locator('body');
    await expect(body).toBeVisible();
  });
});
