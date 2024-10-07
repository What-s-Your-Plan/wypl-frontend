import type { Meta, StoryObj } from '@storybook/react';

import Tooltip from '@/components/Tooltip/Tooltip.tsx';

const meta: Meta<typeof Tooltip> = {
  title: 'Tooltip/Tooltip',
  component: Tooltip,
  tags: ['autodocs'],
  args: {
    text: '툴팁',
    children: <button>Hover me</button>,
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
