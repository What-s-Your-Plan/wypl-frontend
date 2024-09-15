import * as S from './MemberPalette.styled';

import {
  patchMemberLabelColor,
  UpdateLabelColorRequest,
} from '@/api/member/patchMemberLabelColor';
import check from '@/assets/icons/check.svg';
import { LabelColors } from '@/assets/styles/colorThemes';
import ColorCircle from '@/components/common/ColorCircle';
import useMemberStore from '@/stores/MemberStore';

function MemberPalette() {
  const { mainColor, setMainColor: setLabelColor } = useMemberStore();

  const changeLabelColor = async (color: LabelColorsType) => {
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
            {LabelColors.slice(boxIdx * 7, (boxIdx + 1) * 7).map(
              (value: LabelColorsType, idx: number) => (
                <S.SelectLabelColor key={`${boxIdx}-${idx}-color`}>
                  {mainColor === value && (
                    <S.Icon src={check} className={'whiteImg'} />
                  )}
                  <ColorCircle
                    key={`${boxIdx}-${idx}-circle`}
                    onClick={() => changeLabelColor(value)}
                    $bgColor={value}
                    $hover={true}
                    $cursor={'pointer'}
                  />
                </S.SelectLabelColor>
              ),
            )}
          </S.SelectLabelColorsBox>
        ))}
      </S.SelectLabelColorsWrapper>
    </S.Container>
  );
}

export default MemberPalette;
