# @track-my-money/ui

UI component library for Track My Money application.

## Material Design Theme System

This package includes a Material Design 3 theme system generated from the `resources/material-theme.json` configuration file.

### Color Palette

The theme provides a comprehensive color palette with multiple scales:

- `purple` (Primary) - Main brand color
- `slate` (Secondary) - Complementary brand color
- `pink` (Tertiary) - Accent color
- `red` (Error) - Error states
- `gray` (Neutral) - Neutral tones
- `gray-variant` (Neutral Variant) - Alternative neutral tones

Each color has shades from 0 to 100, accessible via CSS variables:

```css
/* Examples */
var(--purple-50)
var(--slate-80)
var(--pink-40)
var(--red-60)
var(--gray-90)
var(--gray-variant-70)
```

### Semantic Tokens

The theme includes semantic tokens that automatically adapt to light and dark modes:

```css
/* Surface colors */
var(--surface)
var(--on-surface)
var(--surface-variant)
var(--surface-container)

/* Brand colors */
var(--primary)
var(--on-primary)
var(--primary-container)
var(--on-primary-container)

/* Error states */
var(--error)
var(--on-error)
var(--error-container)

/* And many more... */
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

#### 3. Use the CSS variables in your components

```css
.button {
  background-color: var(--primary);
  color: var(--on-primary);
  border-radius: 8px;
}

.button:hover {
  background-color: var(--primary-container);
  color: var(--on-primary-container);
}

.card {
  background-color: var(--surface-container);
  color: var(--on-surface);
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

### Regenerating the Theme

If you modify the `resources/material-theme.json` file, regenerate the CSS files:

```bash
pnpm generate:theme
```

This will update:
- `src/styles/palette.css` - Color palette variables
- `src/styles/theme.css` - Semantic token mappings for light and dark themes

### Color Mapping

The generator maps Material Design color names to more generic names:

| Material Name | Generated Name |
|---------------|----------------|
| primary | purple |
| secondary | slate |
| tertiary | pink |
| error | red |
| neutral | gray |
| neutral-variant | gray-variant |

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

