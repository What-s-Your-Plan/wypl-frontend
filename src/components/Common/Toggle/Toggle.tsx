import type { ComponentPropsWithRef } from 'react';

import { Switch } from '@headlessui/react';

import {
  getKnobStyling,
  getSwitchStyling,
  ToggleStyling,
} from './Toggle.styled';

export interface ToggleProps extends ComponentPropsWithRef<typeof Switch> {
  /** 현재 활성화 상태를 나타냅니다. */
  isEnabled: boolean;
  /** 활성화 상태를 변경하는 함수입니다. 현재 상태를 반전시켜 활성화 또는 비활성화합니다. */
  toggleHandler: React.Dispatch<React.SetStateAction<boolean>>;
  /**
   * Toggle 스타일 옵션
   *
   * @@default: 'primary'
   */
  styles?: ToggleStyling;
}

function Toggle({
  isEnabled,
  toggleHandler,
  styles = { $variant: 'primary' },
  ...attributes
}: ToggleProps) {
  return (
    <Switch
      checked={isEnabled}
      onChange={toggleHandler}
      css={[getSwitchStyling(isEnabled, styles.$variant)]}
      {...attributes}
    >
      <span aria-hidden="true" css={getKnobStyling(isEnabled)} />
    </Switch>
  );
}

export default Toggle;
