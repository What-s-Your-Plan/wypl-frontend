import type { Meta, StoryObj } from '@storybook/react';

import LabelButton from '@/components/Common/LabelButton/LabelButton';

const meta: Meta<typeof LabelButton> = {
  title: 'Common/LabelButton',
  component: LabelButton,
  tags: ['autodocs'],
  args: {
    text: '🏃 운동',
    $labelColor: 'red',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
