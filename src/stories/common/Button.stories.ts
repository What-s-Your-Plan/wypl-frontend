import type { Meta, StoryObj } from '@storybook/react';

import Button from '@/components/common/Button.ts';

const meta: Meta<typeof Button> = {
  title: 'Common/Button',
  component: Button,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
