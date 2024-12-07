import React from 'react';

import { Popover } from '@headlessui/react';
import {
  getPopOverContainerStyling,
  getPopOverButtonStyling,
  getPopOverPanelStyling,
  getPopOverPositionStyling,
} from './PopOver.styled';

export interface PopoverProps {
  button: React.ReactNode;
  panel: React.ReactNode;
  $position?: 'default' | 'top' | 'bottom';
}

function PopOver({ button, panel, $position = 'default' }: PopoverProps) {
  return (
    <Popover css={[getPopOverContainerStyling()]}>
      <Popover.Button css={[getPopOverButtonStyling()]}>
        {button}
      </Popover.Button>
      <Popover.Panel
        css={[getPopOverPanelStyling(), getPopOverPositionStyling($position)]}
      >
        {panel}
      </Popover.Panel>
    </Popover>
  );
}

export default PopOver;
