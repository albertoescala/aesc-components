import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import '../heading/ae-heading';
import './ae-card';

type CardStoryArgs = {
  title: string;
  body: string;
};

const meta: Meta<CardStoryArgs> = {
  title: 'Components/Card',
  component: 'ae-card',
  tags: ['autodocs'],
  args: {
    title: 'Card title',
    body: 'Card body content.'
  },
  argTypes: {
    title: { control: { type: 'text' } },
    body: { control: { type: 'text' } }
  },
  render: (args: CardStoryArgs) => html`
    <ae-card>
      <div slot="header"><ae-heading level="3">${args.title}</ae-heading></div>
      <p class="text-sm text-slate-700">${args.body}</p>
      <div slot="footer" class="text-sm text-slate-500">Footer</div>
    </ae-card>
  `
};

export default meta;

type Story = StoryObj<CardStoryArgs>;

export const Default: Story = {};

