import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './ae-input';

type InputStoryArgs = {
  label?: string;
  placeholder?: string;
  value: string;
  disabled: boolean;
  required: boolean;
  helperText?: string;
  errorText?: string;
  type: string;
};

const meta: Meta<InputStoryArgs> = {
  title: 'Components/Input',
  component: 'ae-input',
  tags: ['autodocs'],
  args: {
    label: 'Email',
    placeholder: 'you@example.com',
    value: '',
    disabled: false,
    required: false,
    helperText: 'We will not share your email.',
    errorText: '',
    type: 'email'
  },
  argTypes: {
    label: { control: { type: 'text' } },
    placeholder: { control: { type: 'text' } },
    value: { control: { type: 'text' } },
    type: { control: { type: 'text' } },
    disabled: { control: { type: 'boolean' } },
    required: { control: { type: 'boolean' } },
    helperText: { control: { type: 'text' } },
    errorText: { control: { type: 'text' } }
  },
  render: (args: InputStoryArgs) =>
    html`<ae-input
      .label=${args.label}
      .placeholder=${args.placeholder}
      .value=${args.value}
      .type=${args.type}
      ?disabled=${args.disabled}
      ?required=${args.required}
      helper-text=${args.helperText || ''}
      error-text=${args.errorText || ''}
    ></ae-input>`
};

export default meta;

type Story = StoryObj<InputStoryArgs>;

export const Default: Story = {};

export const Error: Story = {
  args: {
    helperText: '',
    errorText: 'Please enter a valid email.'
  }
};

