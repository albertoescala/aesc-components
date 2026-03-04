import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './ae-heading';

type HeadingStoryArgs = {
  level: 1 | 2 | 3 | 4 | 5 | 6;
  text: string;
};

const meta: Meta<HeadingStoryArgs> = {
  title: 'Components/Heading',
  component: 'ae-heading',
  tags: ['autodocs'],
  args: {
    level: 2,
    text: 'Section title'
  },
  argTypes: {
    level: {
      control: { type: 'select' },
      options: [1, 2, 3, 4, 5, 6]
    },
    text: { control: { type: 'text' } }
  },
  render: (args: HeadingStoryArgs) => html`<ae-heading .level=${args.level}>${args.text}</ae-heading>`
};

export default meta;

type Story = StoryObj<HeadingStoryArgs>;

export const Default: Story = {};

