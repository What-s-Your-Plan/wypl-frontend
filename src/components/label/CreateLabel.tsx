import { Dispatch, SetStateAction, useRef } from 'react';

import postCreateLabel from '@/api/label/postCreateLabel';
import Input from '@/components/Common/Input/Input';
import { CreateDiv } from '@/components/label/Styled';
import ColorSelectButton from '@/components/PalettePanel/ColorSelectButton/ColorSelectButton.tsx';
import useToastStore from '@/stores/ToastStore';
import { LabelColorType } from '@/styles/Theme';

type CreateLabelProps = {
  color: LabelColorType;
  setColor: Dispatch<SetStateAction<LabelColorType>>;
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
      <Input
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
