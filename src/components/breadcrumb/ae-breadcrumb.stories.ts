import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './ae-breadcrumb';

type BreadcrumbStoryArgs = {
  ariaLabel: string;
};

const meta: Meta<BreadcrumbStoryArgs> = {
  title: 'Components/Breadcrumb',
  component: 'ae-breadcrumb',
  tags: ['autodocs'],
  args: {
    ariaLabel: 'Breadcrumb'
  },
  argTypes: {
    ariaLabel: { control: { type: 'text' } }
  },
  render: (args: BreadcrumbStoryArgs) => html`
    <ae-breadcrumb aria-label=${args.ariaLabel}>
      <li><a href="/">Home</a><span aria-hidden="true">/</span></li>
      <li><a href="/docs">Docs</a><span aria-hidden="true">/</span></li>
      <li aria-current="page">Breadcrumb</li>
    </ae-breadcrumb>
  `
};

export default meta;

type Story = StoryObj<BreadcrumbStoryArgs>;

export const Default: Story = {};

