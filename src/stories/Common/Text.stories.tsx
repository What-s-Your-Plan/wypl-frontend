import type { Meta, StoryObj } from '@storybook/react';

import Text from '@/components/Common/Text/Text';

const meta: Meta<typeof Text> = {
  title: 'Common/Text',
  component: Text,
  tags: ['autodocs'],
  args: {
    content: 'Sample Text',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
