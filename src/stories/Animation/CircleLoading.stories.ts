import type { Meta, StoryObj } from '@storybook/react';

import CircleLoading from '@/components/Animation/CircleLoading.tsx';

const meta: Meta<typeof CircleLoading> = {
  title: 'Animation/CircleLoading',
  component: CircleLoading,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
