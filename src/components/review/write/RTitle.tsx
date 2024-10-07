import { WhiteContainer } from '@/components/Common/Container';
import { InputTitle }     from '@/components/Common/InputText';

type RTitleProps = {
  $title: string;
  $setTitle: (title: string) => void;
};

function RTitle({ $title, $setTitle }: RTitleProps) {
  return (
    <WhiteContainer $width="900">
      <InputTitle
        placeholder="제목을 입력해주세요"
        $width="100%"
        value={$title}
        maxLength={30}
        onChange={(e) => {
          $setTitle(e.target.value);
        }}
      />
    </WhiteContainer>
  );
}

export default RTitle;
