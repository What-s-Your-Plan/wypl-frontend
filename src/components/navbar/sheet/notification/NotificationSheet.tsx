import { useEffect } from 'react';
import { useState } from 'react';

import GroupNotification from './GroupNotification';
import * as S from './NotificationSheet.styled';
import ReviewNotification from './ReviewNotification';

import { deleteNotification } from '@/api/notification/deleteNotification';
import { getNotification } from '@/api/notification/getNotification';
import Bell from '@/assets/icons/bell.svg';
import Button from '@/components/Common/Button/Button.tsx';
import Divider from '@/components/Common/Divider/Divider';
import useToastStore from '@/stores/ToastStore';

function NotificationSheet() {
  const { addToast } = useToastStore();

  const [notifications, setNotifications] =
    useState<WYPLNotificationPagingData>({
      notifications: [],
      last_id: '',
      has_next: true,
    });

  const renderNotification = () => {
    return notifications?.notifications.map((notification) => {
      return (
        <div key={notification.id} className="w-full mb-4">
          <Divider styles={{ $direction: 'horizontal' }} />
          {notification.type_code === 'GROUP' ? (
            <GroupNotification
              key={notification.id}
              notification={notification}
            />
          ) : (
            <ReviewNotification
              key={notification.id}
              notification={notification}
            />
          )}
        </div>
      );
    });
  };

  const handleRemoveAll = async () => {
    await deleteNotification().then(() => {
      setNotifications((prev: WYPLNotificationPagingData) => {
        return {
          ...prev,
          has_next: false,
          last_id: '',
          notifications: [],
        };
      });
      addToast({
        duration: 300,
        message: '전체 알림을 삭제하였습니다.',
        type: 'NOTIFICATION',
      });
    });
  };

  const fetchNotifications = async () => {
    const { body } = await getNotification({
      lastId: notifications?.last_id,
    });

    const newNotifications = body;
    newNotifications.notifications = [
      ...notifications.notifications,
      ...body.notifications,
    ];

    setNotifications(newNotifications);
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  return (
    <S.Container>
      <div className="h-[10%] flex items-center">
        <img src={Bell} alt="알림" />
      </div>
      {notifications?.notifications.length > 0 ? (
        <div className="scrollBar w-full h-4/5 flex flex-col">
          {renderNotification()}
          {notifications.has_next && (
            <div className="cursor-pointer" onClick={fetchNotifications}>
              알람 더보기
            </div>
          )}
        </div>
      ) : (
        <div className="w-full h-4/5 flex justify-center items-center">
          알림함이 비어있어요!
        </div>
      )}
      <div className="flex justify-end mt-1">
        <Button
          styles={{
            $size: 'large',
            $variant: 'outline',
          }}
          onClick={() => handleRemoveAll()}
          children={'알림함 비우기'}
        />
      </div>
    </S.Container>
  );
}

export default NotificationSheet;
