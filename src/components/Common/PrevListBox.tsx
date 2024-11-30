import { Fragment, SetStateAction, Dispatch } from 'react';

import { Listbox, Transition } from '@headlessui/react';

import ChevronDown from '@/assets/icons/chevronDown.svg';

type ListBoxProps = {
  list: Array<any>;
  render?: (value: any) => JSX.Element | Array<JSX.Element>;
  selected: any; // 선택된 항목의 상태
  setSelected: Dispatch<SetStateAction<any>>; // 선택된 항목 상태를 변경하는 함수
  width?: string; // Tailwind 클래스명 (기본값: w-72)
  height?: string; // Tailwind 클래스명 (기본값: h-8)
  topList?: React.ReactNode; // 리스트 상단 추가 컴포넌트
  bottomList?: React.ReactNode; // 리스트 하단 추가 컴포넌트
};

function renderSpan(value: string | number): JSX.Element {
  return <span className="truncate">{value}</span>;
}

function ListBox({
  width = 'w-72',
  height = 'h-8',
  list,
  render = renderSpan,
  selected,
  setSelected,
  topList,
  bottomList,
}: ListBoxProps) {
  return (
    <div className={width}>
      <Listbox value={selected} onChange={setSelected}>
        <div className="relative">
          <Listbox.Button
            className={`${height} flex items-center justify-between w-full cursor-pointer rounded-lg px-2 text-left border border-gray-300 hover:border-gray-400 focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-default-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm`}
          >
            {render(selected)}
            <span className="pointer-events-none flex items-center">
              <img src={ChevronDown} className="h-5 w-5" aria-hidden="true" />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="scrollBar absolute z-20 mt-1 max-h-60 w-full overflow-auto rounded-md bg-default-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
              {topList && (
                <ul className="relative cursor-pointer select-none">
                  {topList}
                </ul>
              )}
              {list.map((item, index) => (
                <Listbox.Option
                  key={index}
                  className={({ active }) =>
                    `relative cursor-pointer select-none px-4 py-2 text-gray-700 ${active ? 'bg-main/20' : ''}`
                  }
                  value={item}
                >
                  {render(item)}
                </Listbox.Option>
              ))}
              {bottomList && <ul>{bottomList}</ul>}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
}

export default ListBox;
