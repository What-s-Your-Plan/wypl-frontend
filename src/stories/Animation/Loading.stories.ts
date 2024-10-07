import type { Meta, StoryObj } from '@storybook/react';

import Loading from '@/components/Animation/Loading.tsx';

const meta: Meta<typeof Loading> = {
  title: 'Animation/Loading',
  component: Loading,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
