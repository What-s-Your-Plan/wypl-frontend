import type { Meta, StoryObj } from '@storybook/react';

import { LabelFilterData } from '@/@types/Schedule';
import LabelListBox from '@/components/Common/LabelListBox/LabelListBox';

const labels: Array<LabelFilterData> = [
  {
    id: 1,
    title: '🏃 운동',
    category: '',
    color: 'brown',
  },
  {
    id: 2,
    title: '🔥 공부',
    category: '',
    color: 'red',
  },
  {
    category: '',
    id: 3,
    color: 'green',
    title: '🤖 개발',
  },
];

const selectedLabel: LabelFilterData = {
  category: '',
  id: 3,
  color: 'green',
  title: '🤖 개발',
};

const meta: Meta<typeof LabelListBox> = {
  title: 'Common/LabelListBox',
  component: LabelListBox,
  tags: ['autodocs'],
  args: {
    list: labels,
    selected: selectedLabel,
  },
};

export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
