import type { Meta, StoryObj } from '@storybook/react-vite';

import { TextField } from '@track-my-money/ui/src/components/molecules/text-field/TextField';

const meta: Meta<typeof TextField> = {
  title: 'Molecules/TextField',
  component: TextField,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description: 'The label text for the input field',
    },
    helperText: {
      control: 'text',
      description: 'Helper text displayed below the input',
    },
    error: {
      control: 'boolean',
      description: 'Whether the field has an error',
    },
    required: {
      control: 'boolean',
      description: 'Whether the field is required',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the field is disabled',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text for the input',
    },
    type: {
      control: 'select',
      options: ['text', 'email', 'password', 'number', 'tel', 'url', 'search'],
      description: 'The type of input',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Email',
    placeholder: 'Enter your email',
  },
};

export const WithHelperText: Story = {
  args: {
    label: 'Email',
    placeholder: 'Enter your email',
    helperText: 'We will never share your email with anyone else.',
  },
};

export const Required: Story = {
  args: {
    label: 'Email',
    placeholder: 'Enter your email',
    required: true,
    helperText: 'This field is required',
  },
};

export const WithError: Story = {
  args: {
    label: 'Email',
    placeholder: 'Enter your email',
    error: true,
    helperText: 'Please enter a valid email address',
    defaultValue: 'invalid-email',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Email',
    placeholder: 'Enter your email',
    disabled: true,
    defaultValue: 'disabled@example.com',
    helperText: 'This field is disabled',
  },
};

export const Password: Story = {
  args: {
    label: 'Password',
    type: 'password',
    placeholder: 'Enter your password',
    required: true,
    helperText: 'Password must be at least 8 characters',
  },
};

export const Number: Story = {
  args: {
    label: 'Age',
    type: 'number',
    placeholder: '0',
    helperText: 'Please enter your age',
  },
};

export const Search: Story = {
  args: {
    label: 'Search',
    type: 'search',
    placeholder: 'Search...',
  },
};

export const WithoutLabel: Story = {
  args: {
    placeholder: 'Enter text without label',
    helperText: 'Helper text can still be shown',
  },
};

export const LongHelperText: Story = {
  args: {
    label: 'Description',
    placeholder: 'Enter description',
    helperText:
      'This is a longer helper text that provides more detailed information about what should be entered in this field.',
  },
  decorators: [
    (Story) => (
      <div style={{ minWidth: '400px' }}>
        <Story />
      </div>
    ),
  ],
};

export const FormExample: Story = {
  render: () => (
    <form
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1.5rem',
        minWidth: '400px',
      }}
      onSubmit={(e) => {
        e.preventDefault();
        alert('Form submitted!');
      }}
    >
      <TextField
        label="Full Name"
        type="text"
        placeholder="John Doe"
        required
        helperText="Please enter your full name"
      />
      <TextField
        label="Email"
        type="email"
        placeholder="email@example.com"
        required
        helperText="We'll never share your email"
      />
      <TextField
        label="Phone"
        type="tel"
        placeholder="+1 (555) 000-0000"
        helperText="Optional"
      />
      <TextField
        label="Password"
        type="password"
        placeholder="Enter password"
        required
        helperText="Must be at least 8 characters"
      />
      <button type="submit" style={{ marginTop: '1rem' }}>
        Submit
      </button>
    </form>
  ),
};

export const ValidationStates: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1.5rem',
        minWidth: '400px',
      }}
    >
      <TextField
        label="Valid Email"
        type="email"
        defaultValue="user@example.com"
        helperText="Looks good!"
      />
      <TextField
        label="Invalid Email"
        type="email"
        defaultValue="invalid-email"
        error
        helperText="Please enter a valid email address"
      />
      <TextField
        label="Required Field"
        required
        helperText="This field is required"
      />
      <TextField
        label="Disabled Field"
        defaultValue="Cannot edit this"
        disabled
        helperText="This field is disabled"
      />
    </div>
  ),
};

export const AllTypes: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1.5rem',
        minWidth: '400px',
      }}
    >
      <TextField label="Text" type="text" placeholder="Text input" />
      <TextField label="Email" type="email" placeholder="email@example.com" />
      <TextField label="Password" type="password" placeholder="Password" />
      <TextField label="Number" type="number" placeholder="0" />
      <TextField label="Telephone" type="tel" placeholder="+1 (555) 000-0000" />
      <TextField label="URL" type="url" placeholder="https://example.com" />
      <TextField label="Search" type="search" placeholder="Search..." />
    </div>
  ),
};
