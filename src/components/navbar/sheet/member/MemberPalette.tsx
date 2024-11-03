import * as S from './MemberPalette.styled';

import {
  patchMemberLabelColor,
  UpdateLabelColorRequest,
} from '@/api/member/patchMemberLabelColor';
import check from '@/assets/icons/check.svg';
import ColorCircle from '@/components/Common/ColorCircle/ColorCircle';
import useMemberStore from '@/stores/MemberStore';
import { LabelColorType, Theme } from '@/styles/Theme';

function MemberPalette() {
  const { mainColor, setMainColor: setLabelColor } = useMemberStore();

  const changeLabelColor = async (color: LabelColorType) => {
    if (mainColor === color) {
      return;
    }
    const request: UpdateLabelColorRequest = {
      color,
    };
    const { body } = await patchMemberLabelColor(request);
    setLabelColor(body.color);
  };

  return (
    <S.Container>
      <S.SelectLabelColorsWrapper>
        {[...Array(2)].map((_, boxIdx: number) => (
          <S.SelectLabelColorsBox key={boxIdx}>
            {Theme.circleLabelColor
              .slice(
                boxIdx * 7,
                Math.min((boxIdx + 1) * 7, Theme.circleLabelColor.length),
              )
              .map((value: LabelColorType, idx: number) => (
                <S.SelectLabelColor key={`${boxIdx}-${idx}-color`}>
                  {mainColor === value && (
                    <S.Icon src={check} className={'whiteImg'} />
                  )}
                  <ColorCircle
                    key={`${boxIdx}-${idx}-circle`}
                    onClick={() => changeLabelColor(value)}
                    styles={{
                      $figure: 'circle',
                      $hover: 'hover',
                      $color: value,
                    }}
                  />
                </S.SelectLabelColor>
              ))}
          </S.SelectLabelColorsBox>
        ))}
      </S.SelectLabelColorsWrapper>
    </S.Container>
  );
}

export default MemberPalette;
