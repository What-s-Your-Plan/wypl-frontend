import { axiosWithAccessToken } from '../axios';

import { NOTIFICATION } from '@/api/endpoint.ts';

/* Request */
export type GetNotificationParams = {
  lastId: string | undefined;
};

/* Response */
export type WYPLNotificationResponse = {
  notification: WYPLNotificationData[];
  last_id: string;
  has_next: boolean;
  page_size: number;
};

/* API */
export const getNotification = async (params: GetNotificationParams) => {
  const { data } = await axiosWithAccessToken.get<
    BaseResponse<WYPLNotificationResponse>
  >(
    NOTIFICATION.V1.NOTIFICATIONS.BASE,
    params.lastId !== undefined ? { params } : undefined,
  );

  return data;
};
