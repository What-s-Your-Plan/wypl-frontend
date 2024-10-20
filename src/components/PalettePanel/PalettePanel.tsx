import * as S from './PalettePanel.styled.ts';

import ColorCircle from '@/components/Common/ColorCircle/ColorCircle.ts';
import { LabelColors, LabelColorsType } from '@/styles/colorThemes.ts';

type PalettePanelProps = {
  setColor: (color: LabelColorsType) => void;
  isRounded?: boolean;
};

function PalettePanel({ setColor, isRounded }: PalettePanelProps) {
  const renderColors = () => {
    return LabelColors.map((color: LabelColorsType) => {
      return (
        <S.Element key={color}>
          <ColorCircle
            $labelColor={color as LabelColorsType}
            $cursor="pointer"
            $isRounded={isRounded}
            onClick={() => {
              setColor(color as LabelColorsType);
            }}
          />
        </S.Element>
      );
    });
  };
  return <S.Panel>{renderColors()}</S.Panel>;
}

export default PalettePanel;
