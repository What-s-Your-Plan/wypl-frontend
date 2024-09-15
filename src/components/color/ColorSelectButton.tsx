import { Dispatch, SetStateAction } from 'react';

import { BgColors } from '@/assets/styles/colorThemes';
import PalettePanel from '@/components/color/PalettePanel';
import ColorCircle from '@/components/common/ColorCircle';
import PopOver from '@/components/common/PopOver';

type ColorSelectProps = {
  color: LabelColorsType;
  setColor: Dispatch<SetStateAction<LabelColorsType>>;
};

function ColorSelectButton({ color, setColor }: ColorSelectProps) {
  const changeColor = (color: LabelColorsType) => {
    setColor(color);
  };
  return (
    <PopOver
      panelPosition="top-8"
      button={<ColorCircle $bgColor={color as BgColors} $cursor="pointer" />}
      panel={<PalettePanel setColor={changeColor} />}
    />
  );
}

export default ColorSelectButton;
