import type { DocumentReference, Timestamp } from '@google-cloud/firestore';

import {
  Role,
  UserInterest,
  ConversationCategory,
  MessageCategory,
  ConversationParticipantRole,
  CommunityRole,
  UserCommunityStatus,
  ContentReactionCode,
  ContentCategory
} from '../enum';

/** Utility */
export type OrNull<T> = T | null;
export type Flavoring<Flavor> = {
  _type?: Flavor;
}
export type Flavor<T, Flavor> = T & Flavoring<Flavor>;

/** Document ID Aliases */
export type UserId = Flavor<string, 'UserId'>;
export type ConversationId = Flavor<string, 'ConversationId'>;
export type CommunityId = Flavor<string, 'CommunityId'>;
export type FeedId = Flavor<string, 'FeedId'>;
export type ContentId = Flavor<string, 'ContentId'>;
export type MessageId = Flavor<string, 'MessageId'>;
/** * @description Alias for ContentId */
export type PostId = Flavor<string, 'ContentId'> 
/** * @description Alias for ContentId */
export type CommentId = Flavor<string, 'CommentId'> 
/** * @description Alias for ContentId */
export type ReplyId = Flavor<string, 'ReplyId'>;

/** Documents */
export type RoleDocumentData = {
  root: Role;
  communities: Record<CommunityId, {
    role: CommunityRole, 
    status: UserCommunityStatus
  }>;
};

export type UserDocumentData = {
  username: string;
  displayName: OrNull<string>;
  bio: OrNull<string>;
  photoUrl: OrNull<string>;
  links: UserLinks;
  interests: UserInterests;
  helpingHands: Record<string, string>;
  preferences: UserPreferences;
  conversations: Record<ConversationId, {
    lastReadMessage: OrNull<DocumentReference<MessageSubDocumentData>>
  }>
  communities: Record<CommunityId, DocumentReference<CommunityDocumentData>>;
  defaultCommunity: OrNull<DocumentReference<CommunityDocumentData>>;
}

export type UserCommunity = {
  displayName: string;
  photoURL: string;
  role: CommunityRole;
}  

export type UserPreferences = {
  notifications: {
    all: boolean;
  };
}

export type UserLinks = {
  instagram: OrNull<string>;
  linkedin: OrNull<string>;
  tiktok: OrNull<string>;
  website: OrNull<string>;
}

export type UserInterests = {
  [key in UserInterest]: boolean;
}

export type ConversationDocumentData = {
  type: ConversationCategory;
  photoUrl: OrNull<string>
  displayName: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  roles: Record<UserId, ConversationParticipantRole>;
  recentMessage: OrNull<DocumentReference<MessageSubDocumentData>>;
}

export type MessageSubDocumentData = {
  type: MessageCategory;
  content: string;
  createdAt: Timestamp;
  creatorRef: DocumentReference<UserDocumentData>;
  creatorDisplayName: string;
  creatorPhotoUrl: OrNull<string>
}

export type CommunityDocumentData = {
  displayName: string;
  bio: string;
  photoUrl: string;
  extendsGlobalFeed: boolean;
  createdBy: DocumentReference<UserDocumentData>;
  createdAt: Timestamp;
}

export type ContentMetadata = {
  imageUrls: string[];
  videoUrl: OrNull<string>;
  taggedUsers: DocumentReference<UserDocumentData>[];
  links: string[];
}

export type ContentData<T> = {
  category: ContentCategory;
  metadata: ContentMetadata;
  parentRef: DocumentReference<T>;
  creatorRef: DocumentReference<UserDocumentData>;
  createdAt: Timestamp;
  content: OrNull<string>;
  reactions: {
    [key in ContentReactionCode]: Array<DocumentReference<UserDocumentData>>;
  };
  
}

export type PostSubDocumentData = ContentData<CommunityDocumentData>; 
export type CommentSubDocumentData = ContentData<PostSubDocumentData>; 
export type ReplySubDocumentData = ContentData<CommentSubDocumentData>;


