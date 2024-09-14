import { http, HttpResponse, RequestHandler } from 'msw';

import { NOTIFICATION } from '@/api/endpoint.ts';
import { WYPLNotificationResponse } from '@/api/notification/getNotification.ts';

const response: BaseResponse<WYPLNotificationResponse> = {
  message: '알림 조회 성공',
  body: {
    last_id: 'abcdefg3',
    total_notification_count: 3,
    total_page_count: 1,
    has_next: false,
    page_size: 10,
    notifications: [
      {
        id: 'abcdefg1',
        member_id: 1,
        message: '모코코님 운동 일정은 어떠셨나요?',
        is_read: false,
        is_acted: false,
        type_code: 'REVIEW',
        target_id: 0,
      },
      {
        id: 'abcdefg2',
        member_id: 1,
        message: '모코코님 운동 일정은 어떠셨나요?',
        is_read: true,
        is_acted: false,
        type_code: 'REVIEW',
        target_id: 0,
      },
      {
        id: 'abcdefg3',
        member_id: 1,
        message: 'A602 팀 초대가 왔어요',
        is_read: true,
        is_acted: false,
        type_code: 'GROUP',
        target_id: 0,
      },
      {
        id: 'abcdefg4',
        member_id: 1,
        message: 'WYPL 팀 초대가 왔어요',
        is_read: true,
        is_acted: false,
        type_code: 'GROUP',
        target_id: 0,
      },
      {
        id: 'abcdefg5',
        member_id: 1,
        message: 'GOOGLE 팀 초대가 왔어요',
        is_read: true,
        is_acted: false,
        type_code: 'GROUP',
        target_id: 0,
      },
      {
        id: 'abcdefg6',
        member_id: 1,
        message: '모코코님 공부 일정은 어떠셨나요?',
        is_read: true,
        is_acted: false,
        type_code: 'REVIEW',
        target_id: 0,
      },
    ],
  },
};

const getNotification: RequestHandler = http.get(
  `http://localhost:8080${NOTIFICATION.V1.NOTIFICATIONS.BASE}`,
  () => {
    return HttpResponse.json(response, {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  },
);

export default getNotification;
