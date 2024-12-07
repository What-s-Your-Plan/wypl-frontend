import type { Meta, StoryObj } from '@storybook/react';

import CalendarLabel from '@/components/Common/CalendarLabel/CalendarLabel';

const meta: Meta<typeof CalendarLabel> = {
  title: 'Common/CalendarLabel',
  component: CalendarLabel,
  tags: ['autodocs'],
  args: {
    $color: 'red',
    text: 'label',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
