import * as S from './PalettePanel.styled.ts';

import { LabelColors, LabelColorsType } from '@/assets/styles/colorThemes.ts';
import ColorCircle from '@/components/common/ColorCircle';

type PalettePanelProps = {
  setColor: (color: LabelColorsType) => void;
};

function PalettePanel({ setColor }: PalettePanelProps) {
  const renderColors = () => {
    return LabelColors.map((color: LabelColorsType) => {
      return (
        <S.Element key={color}>
          <ColorCircle
            $labelColor={color as LabelColorsType}
            $cursor="pointer"
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
