import type { Meta, StoryObj } from '@storybook/react';

import ColorSelectButton from '@/components/PalettePanel/ColorSelectButton/ColorSelectButton.tsx';

const meta: Meta<typeof ColorSelectButton> = {
  title: 'PalettePanel/ColorSelectButton',
  component: ColorSelectButton,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    color: 'blue',
  },
};
