import type { Meta, StoryObj } from '@storybook/react';

import ColorCircle from '@/components/Common/ColorCircle/ColorCircle';

const meta: Meta<typeof ColorCircle> = {
  title: 'Common/ColorCircle',
  component: ColorCircle,
  tags: ['autodocs'],
  args: {
    styles: {
      $color: 'brown',
      $figure: 'circle',
      $hover: 'none',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Square: Story = {
  args: {
    styles: {
      $color: 'brown',
      $figure: 'square',
      $hover: 'none',
    },
  },
};
export const Hover: Story = {
  args: {
    styles: {
      $color: 'brown',
      $figure: 'circle',
      $hover: 'hover',
    },
  },
};
