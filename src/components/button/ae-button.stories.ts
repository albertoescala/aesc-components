import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './ae-button';

type ButtonStoryArgs = {
  variant: 'primary' | 'secondary' | 'ghost';
  size: 'sm' | 'md' | 'lg';
  disabled: boolean;
  label: string;
};

const meta: Meta<ButtonStoryArgs> = {
  title: 'Components/Button',
  component: 'ae-button',
  tags: ['autodocs'],
  args: {
    variant: 'primary',
    size: 'md',
    disabled: false,
    label: 'Button'
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'ghost']
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg']
    },
    disabled: {
      control: { type: 'boolean' }
    },
    label: {
      control: { type: 'text' }
    }
  },
  render: (args: ButtonStoryArgs) =>
    html`<ae-button .variant=${args.variant} .size=${args.size} ?disabled=${args.disabled}
      >${args.label}</ae-button
    >`
};

export default meta;

type Story = StoryObj<ButtonStoryArgs>;

export const Primary: Story = {};

export const Secondary: Story = {
  args: {
    variant: 'secondary'
  }
};

export const Ghost: Story = {
  args: {
    variant: 'ghost'
  }
};
