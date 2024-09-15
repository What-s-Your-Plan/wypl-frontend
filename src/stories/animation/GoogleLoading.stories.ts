import type { Meta, StoryObj } from '@storybook/react';

import GoogleLoading from '@/components/animation/GoogleLoading.tsx';

const meta: Meta<typeof GoogleLoading> = {
  title: 'Animation/GoogleLoading',
  component: GoogleLoading,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
