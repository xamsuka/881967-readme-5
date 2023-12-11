import { Notification } from '@project/libs/shared/types';

export class NotificationEntity implements Notification {
  id: string;
  postIds: string[];
}
