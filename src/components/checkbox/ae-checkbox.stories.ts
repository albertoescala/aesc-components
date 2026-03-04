import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './ae-checkbox';

type CheckboxStoryArgs = {
  checked: boolean;
  disabled: boolean;
  label: string;
};

const meta: Meta<CheckboxStoryArgs> = {
  title: 'Components/Checkbox',
  component: 'ae-checkbox',
  tags: ['autodocs'],
  args: {
    checked: false,
    disabled: false,
    label: 'Accept terms'
  },
  argTypes: {
    checked: { control: { type: 'boolean' } },
    disabled: { control: { type: 'boolean' } },
    label: { control: { type: 'text' } }
  },
  render: (args: CheckboxStoryArgs) =>
    html`<ae-checkbox ?checked=${args.checked} ?disabled=${args.disabled}>${args.label}</ae-checkbox>`
};

export default meta;

type Story = StoryObj<CheckboxStoryArgs>;

export const Default: Story = {};

export const Checked: Story = {
  args: {
    checked: true
  }
};

