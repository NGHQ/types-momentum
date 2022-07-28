
import { UserInterest } from '../enum';
import { ConversationId, MessageId } from './alias';

export type UserDocumentData = {
  username?: string;
  displayName?: string;
  bio?: string;
  photoUrl?: string
  links?: UserLinks;
  interests?: UserInterests;
  helpingHands?: Record<string, string>;
  preferences?: UserPreferences;
  conversations?: Record<ConversationId, {lastReadMessageId: MessageId | null}>
}

export type UserPreferences = {
  notifications?: {
    all?: boolean;
  };
}

export type UserLinks = {
  instagram?: string;
  linkedin?: string;
  tiktok?: string;
  website?: string;
}

export type UserInterests = {
  [UserInterest.COMMUNICATION]: boolean;
  [UserInterest.CONSULTING]: boolean;
  [UserInterest.CRYPTO]: boolean;
  [UserInterest.EDUCATION]: boolean;
  [UserInterest.ENERGY]: boolean;
  [UserInterest.ENTERTAINMENT]: boolean;
  [UserInterest.FASHION]: boolean;
  [UserInterest.FINANCE]: boolean;
  [UserInterest.FOOD]: boolean;
  [UserInterest.HEALTH]: boolean;
  [UserInterest.HOSPITALITY]: boolean;
  [UserInterest.MARKETING]: boolean;
  [UserInterest.NON_PROFIT]: boolean;
  [UserInterest.POLITICS]: boolean;
  [UserInterest.REAL_ESTATE]: boolean;
  [UserInterest.SOCIAL_MEDIA]: boolean;
  [UserInterest.SUSTAINABILITY]: boolean;
  [UserInterest.TECH]: boolean;
}
