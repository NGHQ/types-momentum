import { NotificationCategory } from '../../enum';
import { SubCollectionOf, Timestamp } from '../utility';
import { NotificationUserPreview } from './users';

export type NotificationDocumentData = {};

export type UserNotificationDocumentData = SubCollectionOf<'notifications', {
   category: NotificationCategory;
   message: string;
   createdAt: Timestamp;
   hasRead: boolean;
   creator: NotificationUserPreview;
}>;

export type PushNotificationMessage = {
   app_id: string;
   contents: { en: string };
   include_player_ids: string[];
   url?: string;
};
