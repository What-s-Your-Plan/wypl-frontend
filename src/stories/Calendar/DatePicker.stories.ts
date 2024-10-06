import type { Meta, StoryObj } from '@storybook/react';

import DatePicker from '@/components/Calendar/DatePicker/DatePicker.tsx';

const meta: Meta<typeof DatePicker> = {
  title: 'Calendar/DatePicker',
  component: DatePicker,
  tags: ['autodocs'],
  args: {},
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
