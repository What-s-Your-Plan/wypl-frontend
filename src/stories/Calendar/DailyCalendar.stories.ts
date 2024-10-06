import type { Meta, StoryObj } from '@storybook/react';

import DailyCalendar from '@/components/Calendar/Daily/DailyCalendar.tsx';

const meta: Meta<typeof DailyCalendar> = {
  title: 'Calendar/DailyCalendar',
  component: DailyCalendar,
  tags: ['autodocs'],
  args: {},
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
