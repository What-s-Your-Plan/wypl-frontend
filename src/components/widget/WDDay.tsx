import React, { useEffect, useRef, useState } from 'react';

import { getMemberDDay } from '@/api/widget/getMemberDDay.ts';
import patchMemberDDay from '@/api/widget/patchMemberDDay.ts';
import Edit from '@/assets/icons/edit.svg';
import Save from '@/assets/icons/save.svg';
import Button from '@/components/Common/Button/Button.tsx';
import Flex from '@/components/Common/Flex/Flex';
import Input from '@/components/Common/Input/Input';
import { InputDefault } from '@/components/Common/InputText';
import Text from '@/components/Common/Text/Text';
import useMemberStore from '@/stores/MemberStore';
import Tooltip from '../Tooltip/Tooltip';

function WDDay() {
  const { memberId } = useMemberStore();
  const [isModifyingDDay, setIsModifyingDDay] = useState<boolean>(false);
  const isMounted = useRef<boolean>(false);
  const [dDayInfo, setDDayInfo] = useState<DDayData>({
    d_day: '',
    title: '',
    date: '',
    local_date: '',
  });

  const handleModify = async () => {
    setIsModifyingDDay(!isModifyingDDay);
    if (memberId) {
      const { body } = await patchMemberDDay(
        { memberId },
        {
          title: dDayInfo.title,
          dDay: dDayInfo.local_date,
        },
      );

      setDDayInfo(body);
    }
  };

  /**
   * 디데이의 글씨가 너무 긴 경우 CSS 가 깨지기 때문에 폰트를 조절한다.
   */
  const getFontSize = (dDay: string): string => {
    const defaultFontSize = 'text-3xl';

    if (!dDay) return defaultFontSize;

    const length = dDay.length;
    if (length < 4) return defaultFontSize;
    if (length < 6) return 'text-xl';

    return 'text-base';
  };

  /**
   * 입력받은 디데이의 정보를 처리한다.
   *
   * @param field 변경하고자 하는 필드
   */
  const handleInputChange =
    (field: keyof typeof dDayInfo) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setDDayInfo((prevState) => ({
        ...prevState,
        [field]: e.target.value,
      }));
    };

  const setDDayTitle = handleInputChange('title');
  const setTargetDate = handleInputChange('local_date');

  useEffect(() => {
    const fetchUserDDay = async () => {
      if (memberId) {
        const { body } = await getMemberDDay({ memberId });
        setDDayInfo(body);
      }
    };

    if (isMounted.current) {
      return;
    }

    fetchUserDDay().then(() => {
      isMounted.current = true;
    });
  }, [memberId]);

  return (
    <div>
      <div className="flex justify-between">
        <Flex
          styles={{
            align: 'center',
            justify: 'center',
            width: '100%',
            marginBottom: '8px',
            gap: '5px',
          }}
        >
          {isModifyingDDay ? (
            <InputDefault
              className="disabled:bg-transparent"
              $width="60%"
              $void={true}
              id="ddayTitle"
              type="string"
              value={dDayInfo.title}
              disabled={!isModifyingDDay}
              onChange={(e) => setDDayTitle(e)}
              maxLength={10}
              placeholder="디데이 제목(10자 이내)"
            />
          ) : (
            <Tooltip
              text={dDayInfo.title}
              children={<Text content={dDayInfo.title} />}
            />
          )}

          {isModifyingDDay ? (
            <Button
              styles={{ $size: 'small', $variant: 'primary' }}
              onClick={handleModify}
              children={<img src={Save} alt="저장" className="w-5" />}
            />
          ) : (
            <Button
              styles={{ $size: 'small', $variant: 'default' }}
              onClick={handleModify}
              children={<img src={Edit} alt="수정" className="w-5" />}
            />
          )}
        </Flex>
      </div>
      <div>
        {isModifyingDDay ? (
          <InputDefault
            className="disabled:bg-transparent text-sm"
            $width="100%"
            $void={true}
            id="targetDate"
            type="date"
            value={dDayInfo.local_date}
            disabled={!isModifyingDDay}
            onChange={(e) => setTargetDate(e)}
            min={'1970-01-01'}
            max={'2199-12-31'}
            placeholder="디데이 날짜 선택"
          />
        ) : (
          <div
            className={`${getFontSize(dDayInfo.d_day)} text-center mt-1 font-semibold`}
          >
            {dDayInfo.d_day}
          </div>
        )}
      </div>
    </div>
  );
}

export default WDDay;
