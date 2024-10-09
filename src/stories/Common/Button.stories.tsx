import type { Meta, StoryObj } from '@storybook/react';

import Button from '@/components/Common/Button/Button.tsx';

const meta: Meta<typeof Button> = {
  title: 'Common/Button',
  component: Button,
  tags: ['autodocs'],
  args: {
    styles: { $size: 'medium', $variant: 'default' },
    children: <p>Button</p>,
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Primary: Story = {
  args: {
    styles: { $size: 'medium', $variant: 'primary' },
  },
};

export const Secondary: Story = {
  args: {
    styles: { $size: 'medium', $variant: 'secondary' },
  },
};

export const Danger: Story = {
  args: {
    styles: { $size: 'medium', $variant: 'danger' },
  },
};

export const Outline: Story = {
  args: {
    styles: { $size: 'medium', $variant: 'outline' },
  },
};

export const Small: Story = {
  args: {
    styles: { $size: 'small', $variant: 'primary' },
  },
};

export const Medium: Story = {
  args: {
    styles: { $size: 'medium', $variant: 'primary' },
  },
};

export const Large: Story = {
  args: {
    styles: { $size: 'large', $variant: 'primary' },
  },
};
