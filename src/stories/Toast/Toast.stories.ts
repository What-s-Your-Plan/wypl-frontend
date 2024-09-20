import type { Meta, StoryObj } from '@storybook/react';

import Toast from '@/components/Toast/Toast.tsx';

// 기본 `Toast` 컴포넌트에 필요한 `content`와 `removeEvent`를 정의
const meta: Meta<typeof Toast> = {
  title: 'Common/Toast',
  component: Toast,
  tags: ['autodocs'],
  args: {
    content: {
      id: 1,
      type: 'NOTIFICATION', // 기본은 'NOTIFICATION'
      message: '이것은 알림 메시지입니다.',
      duration: 5,
    },
    removeEvent: (id: number) => alert(`Toast with id ${id} removed.`), // 더미 remove 이벤트
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Notification: Story = {};

export const Error: Story = {
  args: {
    content: {
      id: 2,
      type: 'ERROR',
      message: '이것은 에러 메시지입니다.',
      duration: 5,
    },
  },
};
