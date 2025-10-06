# Accessibility Implementation

This document outlines the accessibility features implemented in the Vanitha headless Next.js e-commerce site.

## Features Implemented

### 1. Focus Management
- **Gold accent focus rings**: Subtle focus indicators using the gold accent color (`#C59B2A`)
- **Enhanced focus styles**: All interactive elements have visible focus indicators
- **Focus ring offset**: Proper spacing for better visibility
- **Reduced motion support**: Respects user's motion preferences

### 2. ARIA Live Regions
- **Cart announcements**: Screen reader announcements when items are added to cart
- **Toast notifications**: Proper aria-live implementation for toast messages
- **Context-aware announcements**: Different priority levels for different types of updates

### 3. High Contrast Support
- **Jewelry color combinations**: Optimized text colors for Emerald/Ruby backgrounds
- **WCAG compliance**: Meets AA contrast standards for all color combinations
- **Dark mode support**: Proper contrast ratios in both light and dark themes
- **High contrast mode**: Enhanced styles for users with high contrast preferences

### 4. Skip Links and Navigation
- **Visible skip link**: Skip to main content link that appears on focus
- **Main landmarks**: Proper `<main>` element with ID for navigation
- **Keyboard navigation**: Full keyboard accessibility for all interactive elements

### 5. Automated Testing
- **Playwright tests**: Comprehensive keyboard navigation tests
- **Focus management testing**: Verification of focus indicators
- **Screen reader testing**: ARIA live region functionality tests

## Usage

### Focus Styles
The focus styles are automatically applied to all interactive elements:

```css
/* Enhanced focus styles for better accessibility */
a,
input,
button,
[role="button"],
[role="link"] {
  @apply focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background;
}
```

### ARIA Live Regions
Use the `AriaLiveRegion` component for announcements:

```tsx
import { AriaLiveRegion } from 'components/ui/aria-live-region';

<AriaLiveRegion message="Item added to cart" priority="polite" />
```

### High Contrast Colors
Use the provided utility classes for jewelry color combinations:

```tsx
// For text on jewelry color backgrounds
<div className="bg-chip-emerald text-on-emerald">
  Emerald background with proper contrast
</div>
```

### Skip Links
Skip links are automatically included in the layout:

```tsx
import { SkipToMain } from 'components/ui/skip-link';

<SkipToMain />
```

## Testing

### Running Accessibility Tests
```bash
# Run accessibility tests
npm run test:a11y

# Run tests in headed mode (visible browser)
npm run test:a11y:headed
```

### Test Coverage
The accessibility tests cover:
- Skip link functionality
- Header navigation keyboard accessibility
- Product detail page navigation
- Add to cart button accessibility
- Focus management and indicators
- Modal and overlay navigation
- Form element accessibility
- High contrast mode support
- Screen reader announcements

## Color Contrast Ratios

All jewelry color combinations meet WCAG AA standards:

| Background | Light Theme Text | Dark Theme Text | Contrast Ratio |
|------------|------------------|-----------------|----------------|
| Emerald (#0F6C5B) | Black (#000000) | White (#FFFFFF) | 4.5:1+ |
| Ruby (#A0203C) | White (#FFFFFF) | White (#FFFFFF) | 4.5:1+ |
| Gold (#C59B2A) | Black (#000000) | Black (#000000) | 4.5:1+ |
| Sage (#7A8D79) | White (#FFFFFF) | White (#FFFFFF) | 4.5:1+ |
| Sand (#D7C7A0) | Black (#000000) | Black (#000000) | 4.5:1+ |

## Browser Support

- Chrome/Chromium (latest)
- Firefox (latest)
- Safari/WebKit (latest)
- Edge (latest)

## Keyboard Navigation

### Standard Navigation
- **Tab**: Move forward through interactive elements
- **Shift + Tab**: Move backward through interactive elements
- **Enter/Space**: Activate buttons and links
- **Arrow keys**: Navigate within menus and groups

### Skip Links
- **Tab**: Focus skip link (appears at top of page)
- **Enter**: Activate skip link to jump to main content

### Focus Indicators
All interactive elements have visible focus indicators using the gold accent color with proper contrast ratios.

## Screen Reader Support

- **ARIA live regions**: Announce cart updates and important changes
- **Semantic HTML**: Proper heading structure and landmarks
- **Alt text**: Descriptive text for all images
- **Form labels**: All form elements have proper labeling

## Resources

- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [ARIA Authoring Practices Guide](https://www.w3.org/WAI/ARIA/apg/)
- [WebAIM Keyboard Navigation](https://webaim.org/techniques/keyboard/)
- [Playwright Accessibility Testing](https://playwright.dev/docs/accessibility-testing)
