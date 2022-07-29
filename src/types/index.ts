import type { Timestamp } from 'firebase/firestore';

import {
  UserInterest,
  ConversationCategory,
  MessageCategory,
  ConversationParticipantRole
} from '../enum';

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
  [key in UserInterest]: boolean;
}

export type Flavoring<Flavor> = {
  _type?: Flavor;
}

export type Flavor<T, Flavor> = T & Flavoring<Flavor>;

export type UserId = Flavor<string, 'UserId'>;
export type ConversationId = Flavor<string, 'ConversationId'>;
export type MessageId = Flavor<string, 'MessageId'>;

export type ConversationDocumentData = {
  type: ConversationCategory;
  photoUrl: string | null;
  displayName: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  roles: Record<UserId, ConversationParticipantRole>;
  recentMessage: MessageDocumentData & {id: MessageId};
}


export type MessageDocumentData = {
  type: MessageCategory;
  content: string;
  createdAt: Timestamp;
  creatorId: UserId;
  creatorDisplayName: string;
  creatorPhotoUrl: string | null;
}
