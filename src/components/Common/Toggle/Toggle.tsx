import { Switch } from '@headlessui/react';

import { getKnobStyling, getSwitchStyling } from './Toggle.styled';

export interface ToggleProps {
  /** 현재 활성화 상태를 나타냅니다. */
  isEnabled: boolean;
  /** 활성화 상태를 변경하는 함수입니다. 현재 상태를 반전시켜 활성화 또는 비활성화합니다. */
  toggleHandler: React.Dispatch<React.SetStateAction<boolean>>;
}

function Toggle({ isEnabled, toggleHandler }: ToggleProps) {
  return (
    <Switch
      checked={isEnabled}
      onChange={toggleHandler}
      css={getSwitchStyling(isEnabled)}
    >
      <span aria-hidden="true" css={getKnobStyling(isEnabled)} />
    </Switch>
  );
}

export default Toggle;
