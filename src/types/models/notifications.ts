import { NotificationCategory } from '../../enum';
import { SubCollectionOf, Timestamp } from '../utility';
import { UserPreview } from './users';

export type NotificationDocumentData = Record<string, never>;

export type UserNotificationDocumentData = SubCollectionOf<'notifications', {
   category: NotificationCategory;
   message: string;
   createdAt: Timestamp;
   hasRead: boolean;
   creator: UserPreview;
}>;

export type PushNotificationMessage = {
   app_id: string;
   contents: { en: string };
   include_player_ids: string[];
   external_id?: string;
   send_after?: string;
   delayed_option?: string;
   delivery_time_of_day?: string;
   throttle_rate_per_minute?: number;
};
