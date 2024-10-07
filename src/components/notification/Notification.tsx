import * as S from './Notification.styled';
import Toast from '@/components/Toast/Toast';

import useToastStore from '@/stores/ToastStore';

function Notification() {
  const { toasts, removeToast } = useToastStore();

  return (
    <S.Container>
      {toasts.map((toast: ToastContent) => (
        <Toast content={toast} removeEvent={removeToast} key={toast.id} />
      ))}
    </S.Container>
  );
}

export default Notification;
