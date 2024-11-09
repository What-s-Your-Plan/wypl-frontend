import type { Meta, StoryObj } from '@storybook/react';

import Divider from '@/components/Common/Divider/Divider';

const meta: Meta<typeof Divider> = {
  title: 'Common/Divider',
  component: Divider,
  tags: ['autodocs'],
  args: {
    styles: {
      $direction: 'horizontal',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
