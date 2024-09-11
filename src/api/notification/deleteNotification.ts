import { axiosWithAccessToken } from '../axios';

import { NOTIFICATION } from '@/api/endpoint.ts';

/* API */
export const deleteNotification = async () => {
  const { data } = await axiosWithAccessToken.delete<BaseResponse<void>>(
    NOTIFICATION.V1.NOTIFICATIONS.BASE,
  );

  return data;
};
