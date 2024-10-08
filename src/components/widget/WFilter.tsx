import { useEffect } from 'react';

import LabelButton from '@/components/Common/LabelButton';

import { getLabelList }    from '@/api/label/getLabelList';
import { LabelColorsType } from '@/styles/colorThemes.ts';
import useDateStore        from '@/stores/DateStore';

function WFilter() {
  const dateStore = useDateStore();

  const renderLabels = () => {
    return dateStore.labels.map((label: LabelFilterData) => {
      const isSelected = dateStore.selectedLabels.includes(label);
      const labelBgColor = isSelected ? label.color : 'coolGray';
      const labelClassName = isSelected
        ? ''
        : '!text-default-black !font-medium';
      return (
        <LabelButton
          $labelColor={labelBgColor as LabelColorsType}
          className={labelClassName}
          key={label.id}
          onClick={() => {
            if (isSelected) {
              dateStore.removeSelectedLabels(label);
              return;
            }
            dateStore.addSelectedLabels(label);
          }}
        >
          {label.title}
        </LabelButton>
      );
    });
  };

  useEffect(() => {
    const fetchLabelList = async () => {
      const { body } = await getLabelList();
      dateStore.setLabels(body.labels);
    };

    fetchLabelList();
  }, []);

  return (
    <div>
      <div id="title">
        <div className="font-bold">필터링</div>
      </div>
      <div id="labelList" className="scrollBar flex flex-wrap gap-2 h-28 mt-2">
        <LabelButton
          $labelColor={
            dateStore.selectedLabels.length === 0
              ? 'labelBrown'
              : 'labelLavender'
          }
          className={`h-8 ${dateStore.selectedLabels.length === 0 ? '' : '!text-default-black !font-medium'}`}
          onClick={dateStore.clearSelectedLabels}
        >
          전체
        </LabelButton>
        {renderLabels()}
      </div>
    </div>
  );
}

export default WFilter;
