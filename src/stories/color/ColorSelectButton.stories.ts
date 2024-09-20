import type { Meta, StoryObj } from '@storybook/react';

import ColorSelectButton from '@/components/color/ColorSelectButton.tsx';

const meta: Meta<typeof ColorSelectButton> = {
  title: 'Color/ColorSelectButton',
  component: ColorSelectButton,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    color: 'labelBlue',
  },
};
