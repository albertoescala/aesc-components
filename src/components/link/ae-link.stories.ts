import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './ae-link';

type LinkStoryArgs = {
  href: string;
  target?: string;
  rel?: string;
  disabled: boolean;
  label: string;
};

const meta: Meta<LinkStoryArgs> = {
  title: 'Components/Link',
  component: 'ae-link',
  tags: ['autodocs'],
  args: {
    href: 'https://github.com/albertoescala/aesc-components',
    target: '_blank',
    rel: '',
    disabled: false,
    label: 'GitHub repository'
  },
  argTypes: {
    href: { control: { type: 'text' } },
    target: { control: { type: 'text' } },
    rel: { control: { type: 'text' } },
    disabled: { control: { type: 'boolean' } },
    label: { control: { type: 'text' } }
  },
  render: (args: LinkStoryArgs) =>
    html`<ae-link
      href=${args.href}
      target=${args.target || ''}
      rel=${args.rel || ''}
      ?disabled=${args.disabled}
      >${args.label}</ae-link
    >`
};

export default meta;

type Story = StoryObj<LinkStoryArgs>;

export const Default: Story = {};

export const Disabled: Story = {
  args: {
    disabled: true
  }
};

