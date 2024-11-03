import { Dispatch, SetStateAction } from 'react';

import ColorCircle from '@/components/Common/ColorCircle/ColorCircle.tsx';
import PopOver from '@/components/Common/PopOver.tsx';
import PalettePanel from '@/components/PalettePanel/PalettePanel.tsx';
import { LabelColorType } from '@/styles/Theme';

type ColorSelectProps = {
  color: LabelColorType;
  setColor: Dispatch<SetStateAction<LabelColorType>>;
};

function ColorSelectButton({ color, setColor }: ColorSelectProps) {
  const changeColor = (color: LabelColorType) => {
    setColor(color);
  };
  return (
    <PopOver
      panelPosition="top-8"
      button={
        <ColorCircle
          styles={{
            $color: color,
            $figure: 'circle',
            $hover: 'none',
          }}
        />
      }
      panel={<PalettePanel setColor={changeColor} />}
    />
  );
}

export default ColorSelectButton;
