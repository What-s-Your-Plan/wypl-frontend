import * as S from './PalettePanel.styled.ts';

import ColorCircle from '@/components/Common/ColorCircle/ColorCircle.tsx';
import { LabelColorType, Theme } from '@/styles/Theme';

type PalettePanelProps = {
  setColor: (color: LabelColorType) => void;
  isRounded?: boolean;
};

function PalettePanel({ setColor, isRounded }: PalettePanelProps) {
  const renderColors = () => {
    return Theme.circleLabelColor.map((color: LabelColorType) => {
      return (
        <S.Element key={color}>
          <ColorCircle
            styles={{
              $color: color,
              $figure: isRounded ? 'circle' : 'square',
              $hover: 'hover',
            }}
            onClick={() => {
              setColor(color as LabelColorType);
            }}
          />
        </S.Element>
      );
    });
  };
  return <S.Panel>{renderColors()}</S.Panel>;
}

export default PalettePanel;
