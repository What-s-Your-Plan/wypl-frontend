import type { Meta, StoryObj } from '@storybook/react';

import ColorCircle from '@/components/Common/ColorCircle/ColorCircle';

const meta: Meta<typeof ColorCircle> = {
  title: 'Common/ColorCircle',
  component: ColorCircle,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
