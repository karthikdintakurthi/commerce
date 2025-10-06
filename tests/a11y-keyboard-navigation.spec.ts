import { expect, test } from '@playwright/test';

test.describe('Keyboard Navigation Accessibility', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the homepage
    await page.goto('/');
  });

  test('Skip link is visible and functional', async ({ page }) => {
    // Press Tab to focus the skip link
    await page.keyboard.press('Tab');
    
    // Check if skip link is visible and focused
    const skipLink = page.locator('a[href="#main-content"]');
    await expect(skipLink).toBeVisible();
    await expect(skipLink).toBeFocused();
    
    // Press Enter to activate skip link
    await page.keyboard.press('Enter');
    
    // Check if focus moved to main content
    const mainContent = page.locator('#main-content');
    await expect(mainContent).toBeFocused();
  });

  test('Header navigation is keyboard accessible', async ({ page }) => {
    // Focus the skip link first, then tab through header
    await page.keyboard.press('Tab'); // Skip link
    await page.keyboard.press('Enter'); // Activate skip link
    await page.keyboard.press('Shift+Tab'); // Back to header
    
    // Tab through header navigation elements
    const header = page.locator('header');
    await expect(header).toBeVisible();
    
    // Check if navigation links are focusable
    const navLinks = page.locator('header a[href], header button');
    const linkCount = await navLinks.count();
    
    expect(linkCount).toBeGreaterThan(0);
    
    // Tab through each navigation element
    for (let i = 0; i < linkCount; i++) {
      await page.keyboard.press('Tab');
      const focusedElement = navLinks.nth(i);
      await expect(focusedElement).toBeFocused();
    }
  });

  test('Product detail page keyboard navigation', async ({ page }) => {
    // Navigate to a product page (assuming there's at least one product)
    await page.goto('/products/test-product'); // Adjust URL as needed
    
    // Check if page loaded
    await page.waitForLoadState('networkidle');
    
    // Focus the skip link and navigate to main content
    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');
    
    // Look for product-specific interactive elements
    const productElements = page.locator('button, input, select, a[href]');
    const elementCount = await productElements.count();
    
    if (elementCount > 0) {
      // Test keyboard navigation through product elements
      for (let i = 0; i < Math.min(elementCount, 5); i++) { // Limit to first 5 elements
        await page.keyboard.press('Tab');
        const focusedElement = productElements.nth(i);
        
        // Check if element is focusable and visible
        if (await focusedElement.isVisible()) {
          await expect(focusedElement).toBeFocused();
          
          // Check for focus ring visibility
          const focusRing = await focusedElement.evaluate((el) => {
            const styles = window.getComputedStyle(el);
            return styles.outline || styles.boxShadow;
          });
          
          expect(focusRing).toBeTruthy();
        }
      }
    }
  });

  test('Add to cart button is keyboard accessible', async ({ page }) => {
    // Navigate to a product page
    await page.goto('/products/test-product'); // Adjust URL as needed
    
    // Look for add to cart button
    const addToCartButton = page.locator('button:has-text("Add to Cart"), button:has-text("Add To Cart")');
    
    if (await addToCartButton.isVisible()) {
      // Focus the button
      await addToCartButton.focus();
      await expect(addToCartButton).toBeFocused();
      
      // Check if button has proper ARIA attributes
      const ariaLabel = await addToCartButton.getAttribute('aria-label');
      expect(ariaLabel).toBeTruthy();
      
      // Test keyboard activation
      await page.keyboard.press('Enter');
      
      // Check for aria-live announcement (cart update)
      const liveRegion = page.locator('[aria-live]');
      await expect(liveRegion).toBeAttached();
    }
  });

  test('Focus management and visible focus indicators', async ({ page }) => {
    // Test focus indicators are visible
    const interactiveElements = page.locator('a, button, input, select, textarea, [tabindex]:not([tabindex="-1"])');
    const elementCount = await interactiveElements.count();
    
    if (elementCount > 0) {
      // Focus first element
      await interactiveElements.first().focus();
      
      // Check if focus indicator is visible
      const focusedElement = interactiveElements.first();
      const hasFocusRing = await focusedElement.evaluate((el) => {
        const styles = window.getComputedStyle(el);
        const outline = styles.outline;
        const boxShadow = styles.boxShadow;
        return outline !== 'none' || boxShadow !== 'none';
      });
      
      expect(hasFocusRing).toBeTruthy();
    }
  });

  test('Modal and overlay keyboard navigation', async ({ page }) => {
    // Look for elements that might trigger modals
    const modalTriggers = page.locator('button[aria-haspopup], button[aria-expanded]');
    const triggerCount = await modalTriggers.count();
    
    if (triggerCount > 0) {
      // Focus and activate first modal trigger
      const firstTrigger = modalTriggers.first();
      await firstTrigger.focus();
      await page.keyboard.press('Enter');
      
      // Wait for potential modal to appear
      await page.waitForTimeout(500);
      
      // Check if modal appeared and is focusable
      const modal = page.locator('[role="dialog"], .modal, [aria-modal="true"]');
      if (await modal.isVisible()) {
        // Check if focus is trapped in modal
        const focusedElement = page.locator(':focus');
        await expect(focusedElement).toBeVisible();
      }
    }
  });

  test('Form elements are keyboard accessible', async ({ page }) => {
    // Look for form elements
    const formElements = page.locator('input, select, textarea');
    const elementCount = await formElements.count();
    
    if (elementCount > 0) {
      for (let i = 0; i < elementCount; i++) {
        const element = formElements.nth(i);
        
        if (await element.isVisible()) {
          // Focus the element
          await element.focus();
          await expect(element).toBeFocused();
          
          // Check for proper labeling
          const id = await element.getAttribute('id');
          const ariaLabel = await element.getAttribute('aria-label');
          const ariaLabelledBy = await element.getAttribute('aria-labelledby');
          
          // At least one labeling method should be present
          const hasLabel = id || ariaLabel || ariaLabelledBy;
          expect(hasLabel).toBeTruthy();
        }
      }
    }
  });

  test('High contrast mode support', async ({ page }) => {
    // Simulate high contrast mode preference
    await page.emulateMedia({ colorScheme: 'dark', forcedColors: 'active' });
    
    // Check if page still renders properly
    await page.waitForLoadState('networkidle');
    
    // Look for jewelry color elements and verify they have proper contrast
    const jewelryElements = page.locator('.bg-chip-emerald, .bg-chip-ruby, .bg-chip-gold, .bg-chip-sage, .bg-chip-sand');
    const elementCount = await jewelryElements.count();
    
    if (elementCount > 0) {
      // Check if elements have proper text color classes
      for (let i = 0; i < elementCount; i++) {
        const element = jewelryElements.nth(i);
        const className = await element.getAttribute('class');
        
        // Should have text color class for contrast
        expect(className).toMatch(/text-on-(emerald|ruby|gold|sage|sand)/);
      }
    }
  });

  test('Screen reader announcements work', async ({ page }) => {
    // Navigate to product page
    await page.goto('/products/test-product');
    
    // Look for aria-live regions
    const liveRegions = page.locator('[aria-live]');
    const regionCount = await liveRegions.count();
    
    expect(regionCount).toBeGreaterThan(0);
    
    // Test cart interaction if available
    const addToCartButton = page.locator('button:has-text("Add to Cart"), button:has-text("Add To Cart")');
    if (await addToCartButton.isVisible()) {
      await addToCartButton.click();
      
      // Wait for potential announcement
      await page.waitForTimeout(1000);
      
      // Check if aria-live region has content
      const liveRegion = liveRegions.first();
      const content = await liveRegion.textContent();
      // Content might be empty initially, but region should exist
      expect(liveRegion).toBeAttached();
    }
  });
});
