import type { Meta, StoryObj } from '@storybook/react';

import CalendarIndex from '@/components/Calendar/CalendarIndex/CalendarIndex.tsx';

const meta: Meta<typeof CalendarIndex> = {
  title: 'Calendar/CalendarIndex',
  component: CalendarIndex,
  tags: ['autodocs'],
  args: {
    calendarType: 'MONTH', // 기본값은 'MONTH'
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const MonthView: Story = {};

export const WeekView: Story = {
  args: {
    calendarType: 'WEEK',
  },
};

export const DayView: Story = {
  args: {
    calendarType: 'DAY',
  },
};
