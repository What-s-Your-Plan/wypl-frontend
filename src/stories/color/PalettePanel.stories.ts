import type { Meta, StoryObj } from '@storybook/react';

import PalettePanel from '@/components/color/PalettePanel.tsx';

const meta: Meta<typeof PalettePanel> = {
  title: 'Color/PalettePanel',
  component: PalettePanel,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
