import { useNavigate } from 'react-router-dom';

import Pen from '@/assets/icons/pen.svg';
import Button from '@/components/Common/Button/Button.tsx';

type ReviewNotificationProps = {
  notification: WYPLNotificationData;
};

function ReviewNotification({ notification }: ReviewNotificationProps) {
  const navigator = useNavigate();
  const handleGotoWrite = () => {
    navigator(`/review/write/${notification.target_id}`);
  };

  return (
    <div className="container flex flex-col pt-2">
      {notification.message}
      <Button
        styles={{ $size: 'large', $variant: 'outline' }}
        onClick={handleGotoWrite}
        children={
          <>
            <img src={Pen} alt="펜" className="w-5 mr-2" />
            회고록 작성하러 가기
          </>
        }
      />
    </div>
  );
}

export default ReviewNotification;
