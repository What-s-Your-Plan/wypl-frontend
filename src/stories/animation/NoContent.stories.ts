import type { Meta, StoryObj } from '@storybook/react';

import NoContent from '@/components/animation/NoContent.tsx';

const meta: Meta<typeof NoContent> = {
  title: 'Animation/NoContent',
  component: NoContent,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
