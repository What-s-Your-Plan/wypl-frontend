import { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import Toggle, { ToggleProps } from '@/components/Common/Toggle/Toggle.tsx';

const meta: Meta<typeof Toggle> = {
  title: 'Common/Toggle',
  component: Toggle,
  tags: ['autodocs'],
};

export default meta;

const ToggleStory = (args: ToggleProps) => {
  const [isEnabled, setIsEnabled] = useState<boolean>(true);

  return (
    <Toggle
      {...args}
      isEnabled={isEnabled}
      toggleHandler={() => setIsEnabled((prev) => !prev)}
    />
  );
};

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    styles: { $variant: 'primary' },
  },
  render: (args) => <ToggleStory {...args} />,
};

export const Secondary: Story = {
  args: {
    styles: { $variant: 'secondary' },
  },
  render: (args) => <ToggleStory {...args} />,
};
