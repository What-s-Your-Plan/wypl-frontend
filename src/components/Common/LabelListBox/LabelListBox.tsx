import { Fragment, SetStateAction, Dispatch } from 'react';

import { Listbox as HeadListBox, Transition } from '@headlessui/react';

import CalendarLabel from '../CalendarLabel/CalendarLabel';
import {
  getListBoxButtonStyling,
  getListBoxOptionContainerStyling,
  getListBoxSelectOptionStyling,
  getListBoxSizeStyling,
} from '../ListBox/ListBox.styled';

import { LabelFilterData } from '@/@types/Schedule';
import ChevronDown from '@/assets/icons/chevronDown.svg';

export type LabelListBoxType = LabelFilterData;

export interface ListBoxProps<T extends LabelListBoxType> {
  /** 표시할 항목들의 배열 */
  list: Array<T>;
  /** 현재 선택된 항목의 상태 */
  selected: T;
  /** 선택된 항목 상태를 변경하는 함수, 외부에서 상태 관리 가능 */
  setSelected: Dispatch<SetStateAction<T>>;
  /** 리스트 상단에 추가할 컴포넌트 */
  topList?: React.ReactNode;
  /** 리스트 하단에 추가할 컴포넌트 */
  bottomList?: React.ReactNode;
  /** ListBox 크기 */
  $size?: 'small' | 'medium' | 'large';
}

function LabelListBox({
  list,
  selected,
  setSelected,
  topList,
  bottomList,
  $size = 'medium',
}: ListBoxProps<LabelListBoxType>) {
  const getMaxLength = (arr: Array<LabelListBoxType>): number => {
    return arr
      .map((item) => item.title)
      .reduce((maxLength, str) => Math.max(maxLength, str.length), 0);
  };

  const width: number = 80 + getMaxLength(list) * 15;
  return (
    <div>
      <HeadListBox value={selected} onChange={setSelected}>
        <div css={[getListBoxSizeStyling($size, width)]}>
          <HeadListBox.Button css={[getListBoxButtonStyling]}>
            {selected && (
              <CalendarLabel $color={selected.color} text={selected.title} />
            )}
            <span
              css={{
                pointerEvents: 'none',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <img
                src={ChevronDown}
                css={{
                  height: '20px',
                  width: '20px',
                }}
                aria-hidden="true"
              />
            </span>
          </HeadListBox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <HeadListBox.Options
              css={[getListBoxOptionContainerStyling(width)]}
            >
              {topList && <ul>{topList}</ul>}
              {list.map((item) => (
                <HeadListBox.Option
                  key={item.id}
                  css={[getListBoxSelectOptionStyling]}
                  value={item.id}
                >
                  <CalendarLabel $color={item.color} text={item.title} />
                </HeadListBox.Option>
              ))}
              {bottomList && <ul>{bottomList}</ul>}
            </HeadListBox.Options>
          </Transition>
        </div>
      </HeadListBox>
    </div>
  );
}

export default LabelListBox;
