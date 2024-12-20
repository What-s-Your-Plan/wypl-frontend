import { PrevWhiteContainer } from '@/components/Common/PrevContainer';
import Input from '@/components/Common/Input/Input';

type RTitleProps = {
  $title: string;
  $setTitle: (title: string) => void;
};

function RTitle({ $title, $setTitle }: RTitleProps) {
  return (
    <PrevWhiteContainer $width="900">
      <Input
        placeholder="제목을 입력해주세요"
        $variant="title"
        value={$title}
        maxLength={30}
        onChange={(e) => {
          $setTitle(e.target.value);
        }}
      />
    </PrevWhiteContainer>
  );
}

export default RTitle;
