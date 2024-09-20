import X from '@/assets/icons/x.svg';
import LoadingBar from '@/components/LoadingBar/LoadingBar.tsx';
import * as S from '@/components/Toast/Toast.styled';
import { BgColorsType } from '@/styles/colorThemes.ts';

export interface ToastProps {
  content: ToastContent;
  removeEvent: (id: number) => void;
}

function Toast({ content, removeEvent }: ToastProps) {
  const bgColor: BgColorsType =
    content.type === 'NOTIFICATION' ? 'labelGreen' : 'labelRed';
  const textColor = 'white';

  return (
    <S.Container $bgColor={bgColor} $textColor={textColor}>
      <S.CloseButtonWrapper>
        <S.Icon
          src={X}
          className="whiteImg"
          onClick={() => removeEvent(content.id)}
        />
      </S.CloseButtonWrapper>
      <S.MessageWrapper>
        <S.Message>{content.message}</S.Message>
      </S.MessageWrapper>
      <LoadingBar initialTime={content.duration} />
    </S.Container>
  );
}

export default Toast;
