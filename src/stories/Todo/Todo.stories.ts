import type { Meta, StoryObj } from '@storybook/react';

import Todo from '@/components/Todo/Todo.tsx';

const meta: Meta<typeof Todo> = {
  title: 'Todo/Todo',
  component: Todo,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const MockWithData: Story = {
  args: {
    initTodos: [
      { todo_id: 1, content: 'First Todo', is_completed: false },
      { todo_id: 2, content: 'Second Todo', is_completed: true },
      { todo_id: 3, content: 'Third Todo', is_completed: false },
    ],
  },
};
