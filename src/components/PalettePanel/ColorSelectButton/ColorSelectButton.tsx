import { Dispatch, SetStateAction } from 'react';

import ColorCircle from '@/components/common/ColorCircle.ts';
import PopOver from '@/components/common/PopOver.tsx';
import PalettePanel from '@/components/PalettePanel/PalettePanel.tsx';
import { LabelColorsType } from '@/styles/colorThemes.ts';

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
      button={
        <ColorCircle $labelColor={color as LabelColorsType} $cursor="pointer" />
      }
      panel={<PalettePanel setColor={changeColor} />}
    />
  );
}

export default ColorSelectButton;
