import { Dispatch, SetStateAction, useRef } from 'react';

import postCreateLabel     from '@/api/label/postCreateLabel';
import { LabelColorsType } from '@/styles/colorThemes.ts';
import ColorSelectButton   from '@/components/PalettePanel/ColorSelectButton/ColorSelectButton.tsx';
import { InputDefault }    from '@/components/common/InputText';
import { CreateDiv } from '@/components/label/Styled';
import useToastStore from '@/stores/ToastStore';

type CreateLabelProps = {
  color: LabelColorsType;
  setColor: Dispatch<SetStateAction<LabelColorsType>>;
  handleKeyDown?: (() => void) | (() => Promise<void>);
};

function CreateLabel({ color, setColor, handleKeyDown }: CreateLabelProps) {
  const { addToast } = useToastStore();
  const inputRef = useRef<HTMLInputElement>(null);
  const handleCreate = async () => {
    handleKeyDown ? await handleKeyDown() : null;
  };
  return (
    <CreateDiv>
      <ColorSelectButton color={color} setColor={setColor} />
      <InputDefault
        maxLength={15}
        placeholder="라벨명을 입력하세요"
        onKeyDown={async (e) => {
          e.stopPropagation();
          if (e.key === 'Enter') {
            if (inputRef.current) {
              await postCreateLabel({ color, title: inputRef.current.value });
              await handleCreate();
            } else {
              addToast({
                duration: 300,
                message: '라벨을 입력해 주세요',
                type: 'ERROR',
              });
            }
          }
        }}
        ref={inputRef}
      />
    </CreateDiv>
  );
}

export default CreateLabel;
