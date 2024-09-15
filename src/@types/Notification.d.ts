interface WYPLNotificationPagingData {
  notifications: WYPLNotificationData[];
  last_id: string;
  has_next: boolean;
}

interface WYPLNotificationData {
  id: string;
  member_id: number;
  message: string;
  is_read: boolean; // 알림 읽음 여부
  is_acted: boolean;
  type_code: string;
  target_id: number; //group id 또는 일정 ID
}
