# TextField Component

A comprehensive form control component that combines Label, Input, and helper text, similar to [MUI's TextField](https://mui.com/material-ui/react-text-field/).

## Features

- **Integrated Label**: Automatically associates label with input using `htmlFor` and `id`
- **Helper Text**: Displays additional information or validation messages below the input
- **Error State**: Visual feedback for validation errors
- **Required Fields**: Shows asterisk indicator for required fields
- **Disabled State**: Properly disables both label and input
- **Accessibility**: Includes proper ARIA attributes (`aria-describedby`, `aria-invalid`)
- **Auto-generated IDs**: Uses React's `useId()` hook for unique IDs when not provided

## Usage

```tsx
import { TextField } from '@track-my-money/ui/src/components/molecules/text-field/TextField';

// Basic usage
<TextField
  label="Email"
  type="email"
  placeholder="email@example.com"
/>

// With validation
<TextField
  label="Email"
  type="email"
  placeholder="email@example.com"
  error
  helperText="Please enter a valid email address"
/>

// Required field
<TextField
  label="Password"
  type="password"
  required
  helperText="Password must be at least 8 characters"
/>
```

## Props

Extends `InputHTMLAttributes<HTMLInputElement>` with the following additional props:

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | - | Label text displayed above the input |
| `helperText` | `string` | - | Helper text displayed below the input |
| `error` | `boolean` | `false` | Shows error state styling |
| `required` | `boolean` | `false` | Shows asterisk on label and marks field as required |
| `disabled` | `boolean` | `false` | Disables both label and input |
| `id` | `string` | auto-generated | ID for the input element |

## Comparison with MUI TextField

### Similarities
- Combines label, input, and helper text in one component
- Supports error states with visual feedback
- Shows required field indicators
- Handles disabled states
- Includes accessibility features

### Differences
- Uses atomic components (Label + Input) for better composition
- Simpler API focused on common use cases
- Lighter weight with no external UI library dependencies
- Uses CSS modules for styling instead of styled-components
- Leverages existing design tokens from the UI package

## Examples

See the Storybook stories for comprehensive examples:
- Basic usage
- Form validation
- All input types
- Error states
- Disabled states
- Complete form examples

