import type { Meta, StoryObj } from '@storybook/react';

import ColorCirclePrev from '@/components/Common/ColorCircle/ColorCircle.styled';

const meta: Meta<typeof ColorCirclePrev> = {
  title: 'Common/ColorCircle',
  component: ColorCirclePrev,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
