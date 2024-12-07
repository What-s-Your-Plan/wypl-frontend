import { Fragment, SetStateAction, Dispatch } from 'react';

import { Listbox as HeadListBox, Transition } from '@headlessui/react';

import {
  getListBoxButtonStyling,
  getListBoxOptionContainerStyling,
  getListBoxSelectOptionStyling,
  getListBoxSizeStyling,
} from './ListBox.styled';

import ChevronDown from '@/assets/icons/chevronDown.svg';

export interface ListBoxProps {
  /** 표시할 항목들의 배열 */
  list: Array<string>;
  /** 항목을 렌더링하는 함수, 각 항목을 JSX 요소로 변환하여 표시 */
  render?: (value: string) => JSX.Element;
  /** 현재 선택된 항목의 상태 */
  selected: string;
  /** 선택된 항목 상태를 변경하는 함수, 외부에서 상태 관리 가능 */
  setSelected: Dispatch<SetStateAction<string>>;
  /** 리스트 상단에 추가할 컴포넌트 */
  topList?: React.ReactNode;
  /** 리스트 하단에 추가할 컴포넌트 */
  bottomList?: React.ReactNode;
  /** ListBox 크기 */
  $size?: 'small' | 'medium' | 'large';

  margin?: string; // 추후 Margin 타입으로 지정하기 (검증 필요)
}

function DefaultRender(value: string): JSX.Element {
  return (
    <span
      css={{
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
      }}
    >
      {value}
    </span>
  );
}

function ListBox({
  list,
  render = DefaultRender,
  selected,
  setSelected,
  topList,
  bottomList,
  $size = 'medium',
  margin,
}: ListBoxProps) {
  const getMaxLength = (arr: Array<string>): number => {
    return arr
      .map((item) => item.toString())
      .reduce((maxLength, str) => Math.max(maxLength, str.length), 0);
  };

  const width: number = 40 + getMaxLength(list) * 15;

  return (
    <div css={{ margin: margin }}>
      <HeadListBox value={selected} onChange={setSelected}>
        <div css={[getListBoxSizeStyling($size, width)]}>
          <HeadListBox.Button css={[getListBoxButtonStyling]}>
            {render(selected)}
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
              {list.map((item, index) => (
                <HeadListBox.Option
                  key={index}
                  css={[getListBoxSelectOptionStyling]}
                  value={item}
                >
                  {render(item)}
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

export default ListBox;
