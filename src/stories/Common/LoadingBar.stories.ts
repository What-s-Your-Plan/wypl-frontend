import type { Meta, StoryObj } from '@storybook/react';

import LoadingBar from '@/components/LoadingBar/LoadingBar.tsx';

const meta: Meta<typeof LoadingBar> = {
  title: 'Common/LoadingBar',
  component: LoadingBar,
  tags: ['autodocs'],
  args: {
    initialTime: 5,
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const LongerLoadingBar: Story = {
  args: {
    initialTime: 10, // 10초 동안 진행
  },
};
