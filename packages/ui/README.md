# @track-my-money/ui

UI component library for Track My Money application.

## Design System

This package includes a comprehensive design system with Material Design 3 theme tokens generated from the `resources/material-theme.json` configuration file.

### Design Tokens

All design tokens are available as CSS custom properties (variables) and organized into the following categories:

#### Color Palette

The theme provides a comprehensive color palette with multiple scales:

- `purple` (Primary) - Main brand color
- `slate` (Secondary) - Complementary brand color
- `pink` (Tertiary) - Accent color
- `red` (Error) - Error states
- `gray` (Neutral) - Neutral tones
- `gray-variant` (Neutral Variant) - Alternative neutral tones

Each color has shades from 0 to 100:

```css
var(--purple-50)
var(--slate-80)
var(--pink-40)
var(--red-60)
var(--gray-90)
var(--gray-variant-70)
```

#### Semantic Theme Tokens

Semantic tokens automatically adapt to light and dark modes:

```css
/* Surface colors */
var(--surface)
var(--on-surface)
var(--surface-variant)
var(--surface-container)
var(--surface-container-high)

/* Brand colors */
var(--primary)
var(--on-primary)
var(--primary-container)
var(--on-primary-container)

/* Secondary & Tertiary */
var(--secondary)
var(--tertiary)

/* Error states */
var(--error)
var(--on-error)
var(--error-container)
```

#### Breakpoints

Responsive design breakpoints:

```css
var(--breakpoint-xs)  /* 320px */
var(--breakpoint-s)   /* 390px */
var(--breakpoint-m)   /* 768px */
var(--breakpoint-l)   /* 1024px */
var(--breakpoint-xl)  /* 1440px */
```

#### Metrics

Spacing and border radius tokens:

```css
/* Border radius */
var(--radius-xs)    /* 2px */
var(--radius-sm)    /* 4px */
var(--radius-md)    /* 8px */
var(--radius-lg)    /* 12px */
var(--radius-xl)    /* 16px */
var(--radius-2xl)   /* 20px */
var(--radius-3xl)   /* 24px */
var(--radius-4xl)   /* 32px */
var(--radius-full)  /* 50% */

/* Spacing scale (base: 4px) */
var(--spacing)      /* 4px */
var(--spacing-2)    /* 8px */
var(--spacing-3)    /* 12px */
var(--spacing-4)    /* 16px */
var(--spacing-6)    /* 24px */
var(--spacing-8)    /* 32px */
/* ... up to --spacing-30 (120px) */
```

#### Shadows

Material Design elevation shadows (0-24 levels):

```css
var(--shadows-0)   /* none */
var(--shadows-1)   /* subtle shadow */
var(--shadows-4)   /* medium elevation */
var(--shadows-8)   /* high elevation */
var(--shadows-16)  /* very high elevation */
var(--shadows-24)  /* maximum elevation */
```

#### Typography

Font family tokens:

```css
var(--default-font-family)  /* "Poppins", sans-serif */
var(--accent-font-family)   /* "Outfit", sans-serif */
```

### Usage

#### 1. Import the styles in your application

```typescript
import '@track-my-money/ui/src/styles/tokens/index.scss';
```

#### 2. Set the theme on your root element

```html
<html data-theme="light">
  <!-- Your app content -->
</html>
```

Or for dark theme:

```html
<html data-theme="dark">
  <!-- Your app content -->
</html>
```

#### 3. Use the design tokens in your components

```css
.button {
  background-color: var(--primary);
  color: var(--on-primary);
  border-radius: var(--radius-md);
  padding: var(--spacing-2) var(--spacing-4);
  box-shadow: var(--shadows-2);
  font-family: var(--default-font-family);
}

.button:hover {
  background-color: var(--primary-container);
  color: var(--on-primary-container);
  box-shadow: var(--shadows-4);
}

.card {
  background-color: var(--surface-container);
  color: var(--on-surface);
  border-radius: var(--radius-lg);
  padding: var(--spacing-6);
  box-shadow: var(--shadows-1);
}

@media (min-width: var(--breakpoint-m)) {
  .card {
    padding: var(--spacing-8);
  }
}
```

#### 4. Dynamic theme switching

```typescript
const toggleTheme = () => {
  const html = document.documentElement;
  const currentTheme = html.getAttribute('data-theme');
  const newTheme = currentTheme === 'light' ? 'dark' : 'light';
  html.setAttribute('data-theme', newTheme);
};
```

### Customizing the Theme

The design system is fully customizable. You can easily adapt it to your own brand by:

#### 1. Using Material Theme Builder

Generate your own theme using [Material Theme Builder](https://material-foundation.github.io/material-theme-builder/):

1. Choose your brand colors
2. Export the theme as JSON
3. Replace `resources/material-theme.json` with your exported file
4. Run the generation script

#### 2. Regenerating Theme Files

After modifying `resources/material-theme.json`, regenerate the SCSS files:

```bash
pnpm generate:theme
```

This will update:

- `src/styles/tokens/palette.scss` - Color palette variables
- `src/styles/tokens/theme.scss` - Semantic token mappings for light and dark themes

#### 3. Customizing Other Tokens

You can directly edit the following files to match your design requirements:

- `src/styles/tokens/breakpoints.scss` - Responsive breakpoints
- `src/styles/tokens/metrics.scss` - Spacing and border radius values
- `src/styles/tokens/shadows.scss` - Elevation shadow definitions
- `src/styles/tokens/fonts.scss` - Typography settings

All tokens are defined as CSS custom properties, making them easy to override or extend.

### Color Mapping

The generator maps Material Design color names to more generic names:

| Material Name   | Generated Name |
| --------------- | -------------- |
| primary         | purple         |
| secondary       | slate          |
| tertiary        | pink           |
| error           | red            |
| neutral         | gray           |
| neutral-variant | gray-variant   |

This allows the color palette to be reusable across different design systems while maintaining Material Design's semantic naming conventions.

## Components

Component documentation coming soon...

## Development

### Scripts

- `pnpm lint` - Run ESLint
- `pnpm lint:fix` - Fix ESLint errors
- `pnpm stylelint` - Run Stylelint
- `pnpm stylelint:fix` - Fix Stylelint errors
- `pnpm type-check` - Run TypeScript type checking
- `pnpm generate:component` - Generate a new React component
- `pnpm generate:theme` - Regenerate theme CSS files
