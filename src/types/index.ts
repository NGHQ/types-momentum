import type { DocumentReference, Timestamp } from 'firebase/firestore';

import {
  UserInterest,
  ConversationCategory,
  MessageCategory,
  ConversationParticipantRole,
  CommunityRole,
  CommunityStatus,
  Emoji
} from '../enum';

export type UserDocumentData = {
  username?: string;
  displayName?: string;
  bio?: string;
  photoUrl?: string
  links?: UserLinks;
  interests: UserInterests;
  helpingHands: Record<string, string>;
  preferences: UserPreferences;
  conversations: Record<ConversationId, {lastReadMessageId: MessageId | null}>
  communities: Record<CommunityId, {
    displayName: string;
    photoUrl: string;
  }>
  defaultCommunity: CommunityId | null;
  role: CommunityRole;
  status: CommunityStatus;
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
export type CommunityId = Flavor<string, 'CommunityId'>;
export type MessageId = Flavor<string, 'MessageId'>;

export type ConversationDocumentData = {
  type: ConversationCategory;
  photoUrl: string | null;
  displayName: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  roles: Record<UserId, ConversationParticipantRole>;
  recentMessage: (MessageDocumentData & {id: MessageId}) | null;
}

export type MessageDocumentData = {
  type: MessageCategory;
  content: string;
  createdAt: Timestamp;
  creatorId: UserId;
  creatorDisplayName: string;
  creatorPhotoUrl: string | null;
}

export type CommunityDocumentData = {
  displayName: string;
  bio: string;
  photoUrl: string;
  globalFeed: boolean;
  feedRef: DocumentReference;
  createdBy: UserId;
  createdAt: Timestamp;
}

export type CommunityMetadata = {
  isImageIncluded: boolean;
  isVideoIncluded: boolean;
  isUserTagged: boolean;
  data: {
    images?: string[];
    video?: string;
    taggedUsers?: UserId[];
  }
}

export type PostDocumentData = {
  createdAt: Timestamp;
  creatorId: UserId;
  content?: string;
  metadata?: CommunityMetadata;
  reactions?: Record<Emoji, UserId[]>;
}

export type CommentDocumentData = PostDocumentData;
export type ReplyDocumentData = PostDocumentData;
