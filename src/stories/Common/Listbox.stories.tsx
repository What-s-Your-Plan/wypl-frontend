import type { Meta, StoryObj } from '@storybook/react';

import ListBox from '@/components/Common/ListBox/ListBox';

const numbers: Array<string> = ['1', '2', '3', '4', '5'];

const meta: Meta<typeof ListBox> = {
  title: 'Common/Listbox',
  component: ListBox,
  tags: ['autodocs'],
  args: {
    list: numbers,
    selected: '1',
    setSelected: (value) => {
      const newValue = typeof value === 'function' ? value(numbers[0]) : value;
      alert(`Selected ${newValue}`);
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
