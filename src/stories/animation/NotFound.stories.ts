import type { Meta, StoryObj } from '@storybook/react';

import NotFound from '@/components/animation/NotFound.tsx';

const meta: Meta<typeof NotFound> = {
  title: 'Animation/NotFound',
  component: NotFound,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
