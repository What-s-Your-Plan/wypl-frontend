import React, { Dispatch, SetStateAction } from 'react';

import * as S from './Schedule.styled';

import type { Label, RepeatData, ScheduleData } from '@/@types/Schedule';
import type { LabelColorType } from '@/styles/Theme';

import ArrowRightIcon from '@/assets/icons/arrowRight.svg';
import CalendarAddIcon from '@/assets/icons/calendarAdd.svg';
import ClockIcon from '@/assets/icons/clock.svg';
import RepeatIcon from '@/assets/icons/repeat.svg';
import LabelIcon from '@/assets/icons/tag.svg';
import DescriptionIcon from '@/assets/icons/textAlignLeft.svg';
import Box from '@/components/Common/Box/Box';
import Center from '@/components/Common/Center/Center';
import Flex from '@/components/Common/Flex/Flex';
import Input from '@/components/Common/Input/Input';
import LabelButton from '@/components/Common/LabelButton';
import ListBox from '@/components/Common/ListBox/ListBox';
import PrevListBox from '@/components/Common/PrevListBox';
import Textarea from '@/components/Common/Textarea/Textarea';
import Toggle from '@/components/Common/Toggle/Toggle';
import { AM_PM, DAYS } from '@/constants/Calendar';
import useDateStore from '@/stores/DateStore';

type ChangeProps = {
  states: ScheduleData & RepeatData;
  handleChange: (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>,
  ) => void;
};

type SetProps = {
  states: ScheduleData & RepeatData;
  setStates: Dispatch<SetStateAction<ScheduleData & RepeatData>>;
};

function Title({ states, handleChange }: ChangeProps) {
  return (
    <Flex styles={{ align: 'center' }}>
      <img src={CalendarAddIcon} alt="CalendarAdd" />
      <div css={{ width: '100%' }}>
        <Input
          type="text"
          $variant="title"
          name="title"
          maxLength={50}
          placeholder="제목 추가"
          value={states.title}
          onChange={handleChange}
        />
      </div>
    </Flex>
  );
}

function Time({ states, handleChange, setStates }: ChangeProps & SetProps) {
  const handleAllday = (value: boolean) => {
    setStates((prev) => {
      return {
        ...prev,
        isAllDay: value,
      };
    });
  };

  const handleStartAmPm = (value: string) => {
    setStates((prev) => {
      return {
        ...prev,
        startAMPM: value,
      };
    });
  };

  const handleEndAmPm = (value: string) => {
    setStates((prev) => {
      return {
        ...prev,
        endAMPM: value,
      };
    });
  };

  return (
    <Flex styles={{ align: 'center', direction: 'column' }}>
      <Center>
        <img src={ClockIcon} alt="Clock" css={{ position: 'relative' }} />
        <Center>
          <Box css={{ width: '100%' }}>
            <Flex styles={{ gap: '10px' }}>
              <Toggle
                isEnabled={states.isAllDay}
                toggleHandler={
                  handleAllday as Dispatch<SetStateAction<boolean>>
                }
                css={{ marginLeft: '24px' }}
              />
              <span>하루 종일</span>
            </Flex>
          </Box>
        </Center>
      </Center>
      <Flex styles={{ align: 'center', direction: 'column' }}>
        <Flex styles={{ align: 'center', justify: 'space-between' }}>
          <Input
            type="date"
            value={states.startDate}
            $size="small"
            name="startDate"
            onChange={handleChange}
          />
          <img src={ArrowRightIcon} alt="arrow-right" />
          <Input
            type="date"
            value={states.endDate}
            $size="small"
            name="endDate"
            onChange={handleChange}
          />
        </Flex>
        {/* TODO: 추후 Time Input 으로 리펙토링 예정 */}
        {states.isAllDay === false && (
          <Box>
            <Flex
              styles={{
                align: 'center',
              }}
            >
              <ListBox
                list={AM_PM}
                selected={states.startAMPM}
                setSelected={
                  handleStartAmPm as Dispatch<SetStateAction<string>>
                }
              />
              <Input
                type="number"
                min="1"
                max="12"
                $size="small"
                value={states.startHour}
                name="startHour"
                onChange={handleChange}
              />
              <span>:</span>
              <Input
                type="number"
                min="0"
                max="59"
                $size="small"
                value={states.startMinute}
                name="startMinute"
                onChange={handleChange}
              />
              <ListBox
                list={AM_PM}
                selected={states.endAMPM}
                setSelected={handleEndAmPm as Dispatch<SetStateAction<string>>}
              />
              <Input
                type="number"
                min="1"
                max="12"
                $size="small"
                value={states.endHour}
                name="endHour"
                onChange={handleChange}
              />
              <span>:</span>
              <Input
                type="number"
                min="0"
                max="59"
                $size="small"
                value={states.endMinute}
                name="endMinute"
                onChange={handleChange}
              />
            </Flex>
          </Box>
        )}
      </Flex>
    </Flex>
  );
}

function Description({ states, handleChange }: ChangeProps) {
  return (
    <Flex>
      <img src={DescriptionIcon} alt="Description" />
      <Box css={{ width: '90%' }}>
        <Textarea
          name="description"
          placeholder="설명 추가"
          value={states.description}
          onChange={handleChange}
          $resize={false}
          maxLength={255}
          css={{ height: '128px', marginLeft: '24px' }}
        />
      </Box>
    </Flex>
  );
}

function Label({ states, setStates }: SetProps) {
  const { labels } = useDateStore();
  const handleLabel = (value: Label) => {
    setStates((prev) => {
      return {
        ...prev,
        label: value,
      };
    });
  };

  return (
    <Flex styles={{ align: 'center' }}>
      <img src={LabelIcon} alt="Label" />
      <Box css={{ width: '90%', marginLeft: '24px' }}>
        <PrevListBox
          width="w-full"
          height="h-[44px]"
          list={[
            null,
            ...labels.filter((label) => {
              return label.category === 'MEMBER';
            }),
          ]}
          selected={states.label}
          setSelected={handleLabel}
          render={(item: Label | null) => {
            return item ? (
              <LabelButton as="div" $labelColor={item.color as LabelColorType}>
                {item.title}
              </LabelButton>
            ) : (
              <span className="py-3 px-2">없음</span>
            );
          }}
        />
      </Box>
    </Flex>
  );
}

function Repeat({ states, handleChange, setStates }: ChangeProps & SetProps) {
  const cycle = ['매일', '매 주', '매 달', '매 년'];
  const period = ['계속 반복', '종료 날짜'];

  const setRepetition = (value: boolean) => {
    setStates((prev) => {
      return {
        ...prev,
        isRepetition: value,
      };
    });
  };

  const setRepeatCycle = (value: string) => {
    setStates((prev) => {
      return {
        ...prev,
        repetitionCycle: value,
      };
    });
  };

  const setPeriod = (value: string) => {
    setStates((prev) => {
      return {
        ...prev,
        period: value,
      };
    });
  };

  return (
    <Flex styles={{ align: 'center', direction: 'column' }}>
      <Flex styles={{ align: 'center', width: '100%' }}>
        <img src={RepeatIcon} alt="repeat" />
        <Flex
          styles={{ direction: 'column', marginLeft: '24px', width: '90%' }}
        >
          <Box>
            <Flex styles={{ gap: '10px', margin: '10px 0px' }}>
              <span>반복 유무</span>
              <Toggle
                isEnabled={states.isRepetition}
                toggleHandler={
                  setRepetition as Dispatch<SetStateAction<boolean>>
                }
              />
            </Flex>
          </Box>
        </Flex>
      </Flex>
      <Flex styles={{ align: 'center', width: '100%' }}>
        <div id={'dummy area'} css={{ width: '24px', height: '24px' }} />
        <Flex
          styles={{ direction: 'column', marginLeft: '24px', width: '90%' }}
        >
          <Flex
            styles={{
              align: 'center',
              justify: 'space-between',
              direction: 'column',
              margin: '10px 0px',
            }}
          >
            {states.isRepetition && (
              <Box styles={{ width: '100%' }}>
                <Flex
                  styles={{
                    align: 'center',
                    direction: 'row',
                    gap: '10px',
                  }}
                >
                  <span>반복 주기</span>
                  <ListBox
                    list={cycle}
                    selected={states.repetitionCycle}
                    setSelected={
                      setRepeatCycle as Dispatch<SetStateAction<string>>
                    }
                  />
                  {states.repetitionCycle === '매 주' && (
                    <Flex
                      styles={{
                        align: 'center',
                        direction: 'row',
                      }}
                    >
                      <Input
                        type="number"
                        name="week"
                        value={states.week}
                        onChange={handleChange}
                      />
                      <span>주 마다</span>
                    </Flex>
                  )}
                </Flex>
                {states.repetitionCycle === '매 주' && (
                  <Center>
                    <Box styles={{ width: '75%' }}>
                      <DateSelect states={states} setStates={setStates} />
                    </Box>
                  </Center>
                )}
              </Box>
            )}
          </Flex>
        </Flex>
      </Flex>
      <Flex styles={{ align: 'center', width: '100%' }}>
        <div id={'dummy area'} css={{ width: '24px', height: '24px' }} />
        <Flex
          styles={{ direction: 'column', marginLeft: '24px', width: '90%' }}
        >
          <Flex
            styles={{
              align: 'center',
              justify: 'space-between',
              direction: 'column',
              margin: '10px 0px',
            }}
          >
            {states.isRepetition && (
              <Flex
                styles={{
                  align: 'center',
                  direction: 'row',
                  gap: '10px',
                }}
              >
                <span>반복 유형</span>
                <ListBox
                  list={period}
                  selected={states.period}
                  setSelected={setPeriod as Dispatch<SetStateAction<string>>}
                  margin="10px 0px"
                />
              </Flex>
            )}
          </Flex>
        </Flex>
      </Flex>
      <Flex styles={{ align: 'center', width: '100%' }}>
        <div id={'dummy area'} css={{ width: '24px', height: '24px' }} />
        <Flex
          styles={{ direction: 'column', marginLeft: '24px', width: '90%' }}
        >
          <Flex
            styles={{
              align: 'center',
              justify: 'space-between',
              direction: 'column',
            }}
          >
            {states.isRepetition && states.period === '종료 날짜' && (
              <Flex styles={{ align: 'center', width: '100%' }}>
                <span>종료 날짜</span>
                <Input
                  type="date"
                  name="endRDate"
                  value={states.endRDate}
                  onChange={handleChange}
                />
              </Flex>
            )}
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
}

function DateSelect({ states, setStates }: SetProps) {
  const checkSelected = (day: number) => {
    return !!(states.dayOfWeek & (1 << day));
  };

  const handleClick = (day: number) => {
    setStates((prev) => {
      return {
        ...prev,
        dayOfWeek: prev.dayOfWeek ^ (1 << day),
      };
    });
  };

  return (
    <Flex styles={{ justify: 'space-around', width: '100%' }}>
      {DAYS.map(({ id, title }) => (
        <S.DayButton
          $isSelected={checkSelected(id)}
          onClick={() => {
            handleClick(id);
          }}
          $satur={id === 6}
          $sun={id === 7}
        >
          {title}
        </S.DayButton>
      ))}
    </Flex>
  );
}

export { Title, Time, Description, Label, Repeat };
