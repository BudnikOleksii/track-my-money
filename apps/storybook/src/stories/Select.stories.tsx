import type { Meta, StoryObj } from '@storybook/react-vite';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from '@track-my-money/ui/src/components/molecules/select/Select';

const meta: Meta<typeof Select> = {
  title: 'Molecules/Select',
  component: Select,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Select>
      <SelectTrigger style={{ width: '280px' }}>
        <SelectValue placeholder="Select a fruit" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="apple">Apple</SelectItem>
        <SelectItem value="banana">Banana</SelectItem>
        <SelectItem value="orange">Orange</SelectItem>
        <SelectItem value="grape">Grape</SelectItem>
        <SelectItem value="pineapple">Pineapple</SelectItem>
      </SelectContent>
    </Select>
  ),
};

export const WithGroups: Story = {
  render: () => (
    <Select>
      <SelectTrigger style={{ width: '280px' }}>
        <SelectValue placeholder="Select a fruit" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Fruits</SelectLabel>
          <SelectItem value="apple">Apple</SelectItem>
          <SelectItem value="banana">Banana</SelectItem>
          <SelectItem value="orange">Orange</SelectItem>
        </SelectGroup>
        <SelectSeparator />
        <SelectGroup>
          <SelectLabel>Vegetables</SelectLabel>
          <SelectItem value="carrot">Carrot</SelectItem>
          <SelectItem value="potato">Potato</SelectItem>
          <SelectItem value="tomato">Tomato</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  ),
};

export const WithDefaultValue: Story = {
  render: () => (
    <Select defaultValue="banana">
      <SelectTrigger style={{ width: '280px' }}>
        <SelectValue placeholder="Select a fruit" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="apple">Apple</SelectItem>
        <SelectItem value="banana">Banana</SelectItem>
        <SelectItem value="orange">Orange</SelectItem>
        <SelectItem value="grape">Grape</SelectItem>
      </SelectContent>
    </Select>
  ),
};

export const Disabled: Story = {
  render: () => (
    <Select disabled>
      <SelectTrigger style={{ width: '280px' }}>
        <SelectValue placeholder="Select a fruit" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="apple">Apple</SelectItem>
        <SelectItem value="banana">Banana</SelectItem>
        <SelectItem value="orange">Orange</SelectItem>
      </SelectContent>
    </Select>
  ),
};

export const DisabledItems: Story = {
  render: () => (
    <Select>
      <SelectTrigger style={{ width: '280px' }}>
        <SelectValue placeholder="Select a fruit" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="apple">Apple</SelectItem>
        <SelectItem value="banana" disabled>
          Banana (Out of stock)
        </SelectItem>
        <SelectItem value="orange">Orange</SelectItem>
        <SelectItem value="grape" disabled>
          Grape (Out of stock)
        </SelectItem>
        <SelectItem value="pineapple">Pineapple</SelectItem>
      </SelectContent>
    </Select>
  ),
};

export const LongList: Story = {
  render: () => (
    <Select>
      <SelectTrigger style={{ width: '280px' }}>
        <SelectValue placeholder="Select a timezone" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="utc">UTC</SelectItem>
        <SelectItem value="est">Eastern Time (ET)</SelectItem>
        <SelectItem value="cst">Central Time (CT)</SelectItem>
        <SelectItem value="mst">Mountain Time (MT)</SelectItem>
        <SelectItem value="pst">Pacific Time (PT)</SelectItem>
        <SelectItem value="akst">Alaska Time (AKT)</SelectItem>
        <SelectItem value="hst">Hawaii Time (HT)</SelectItem>
        <SelectItem value="gmt">Greenwich Mean Time (GMT)</SelectItem>
        <SelectItem value="cet">Central European Time (CET)</SelectItem>
        <SelectItem value="eet">Eastern European Time (EET)</SelectItem>
        <SelectItem value="ist">India Standard Time (IST)</SelectItem>
        <SelectItem value="jst">Japan Standard Time (JST)</SelectItem>
        <SelectItem value="aest">Australian Eastern Time (AEST)</SelectItem>
        <SelectItem value="nzst">New Zealand Standard Time (NZST)</SelectItem>
      </SelectContent>
    </Select>
  ),
};

export const Countries: Story = {
  render: () => (
    <Select>
      <SelectTrigger style={{ width: '280px' }}>
        <SelectValue placeholder="Select your country" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>North America</SelectLabel>
          <SelectItem value="us">United States</SelectItem>
          <SelectItem value="ca">Canada</SelectItem>
          <SelectItem value="mx">Mexico</SelectItem>
        </SelectGroup>
        <SelectSeparator />
        <SelectGroup>
          <SelectLabel>Europe</SelectLabel>
          <SelectItem value="uk">United Kingdom</SelectItem>
          <SelectItem value="fr">France</SelectItem>
          <SelectItem value="de">Germany</SelectItem>
          <SelectItem value="es">Spain</SelectItem>
          <SelectItem value="it">Italy</SelectItem>
        </SelectGroup>
        <SelectSeparator />
        <SelectGroup>
          <SelectLabel>Asia</SelectLabel>
          <SelectItem value="jp">Japan</SelectItem>
          <SelectItem value="cn">China</SelectItem>
          <SelectItem value="in">India</SelectItem>
          <SelectItem value="kr">South Korea</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  ),
};

export const InForm: Story = {
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
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <label
          htmlFor="country"
          style={{ fontSize: '0.875rem', fontWeight: 500 }}
        >
          Country
        </label>
        <Select name="country">
          <SelectTrigger id="country">
            <SelectValue placeholder="Select your country" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="us">United States</SelectItem>
            <SelectItem value="ca">Canada</SelectItem>
            <SelectItem value="uk">United Kingdom</SelectItem>
            <SelectItem value="au">Australia</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <label
          htmlFor="language"
          style={{ fontSize: '0.875rem', fontWeight: 500 }}
        >
          Language
        </label>
        <Select name="language" defaultValue="en">
          <SelectTrigger id="language">
            <SelectValue placeholder="Select your language" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="en">English</SelectItem>
            <SelectItem value="es">Español</SelectItem>
            <SelectItem value="fr">Français</SelectItem>
            <SelectItem value="de">Deutsch</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <button
        type="submit"
        style={{
          padding: '0.5rem 1rem',
          borderRadius: '0.375rem',
          border: 'none',
          backgroundColor: '#0066cc',
          color: 'white',
          cursor: 'pointer',
        }}
      >
        Submit
      </button>
    </form>
  ),
};

export const MultipleSelects: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1.5rem',
        minWidth: '400px',
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <label style={{ fontSize: '0.875rem', fontWeight: 500 }}>Fruit</label>
        <Select defaultValue="apple">
          <SelectTrigger>
            <SelectValue placeholder="Select a fruit" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="apple">Apple</SelectItem>
            <SelectItem value="banana">Banana</SelectItem>
            <SelectItem value="orange">Orange</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <label style={{ fontSize: '0.875rem', fontWeight: 500 }}>Color</label>
        <Select defaultValue="blue">
          <SelectTrigger>
            <SelectValue placeholder="Select a color" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="red">Red</SelectItem>
            <SelectItem value="blue">Blue</SelectItem>
            <SelectItem value="green">Green</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <label style={{ fontSize: '0.875rem', fontWeight: 500 }}>Size</label>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Select a size" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="xs">Extra Small</SelectItem>
            <SelectItem value="s">Small</SelectItem>
            <SelectItem value="m">Medium</SelectItem>
            <SelectItem value="l">Large</SelectItem>
            <SelectItem value="xl">Extra Large</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  ),
};
