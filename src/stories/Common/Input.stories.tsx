import type { Meta, StoryObj } from '@storybook/react';

import Input from '@/components/Common/Input/Input';

const meta: Meta<typeof Input> = {
  title: 'Common/Input',
  component: Input,
  tags: ['autodocs'],
  args: {
    styles: {},
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
