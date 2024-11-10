import type { Meta, StoryObj } from '@storybook/react';

import Input from '@/components/Common/Input/Input';

const meta: Meta<typeof Input> = {
  title: 'Common/Input',
  component: Input,
  tags: ['autodocs'],
  args: {
    $variant: 'default',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Title: Story = {
  args: {
    $variant: 'title',
  },
};
