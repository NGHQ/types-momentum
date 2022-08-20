import {
  Role, 
  CommunityRole, 
  UserCommunityStatus,
  UserInterest,
  ContentCategory,
  ContentReactionCode,
  ConversationCategory,
  ConversationParticipantRole,
  MessageCategory, 

} from '../enum';
import type {
  Immutable,
  OrNull, 
  CommunityId, 
  ConversationId, 
  DocPath,
  SubCollectionOf,
  Timestamp,
  UserId, 
} from './utility'

export type RoleDocumentData = Immutable<{
  root: Role;
  communities: Record<CommunityId, {
    role: CommunityRole, 
    status: UserCommunityStatus
  }>;
}>;

export type UserDocumentData = Immutable<{
  username: string;
  displayName: OrNull<string>;
  bio: OrNull<string>;
  photoUrl: OrNull<string>;
  links: UserLinks;
  interests: UserInterests;
  helpingHands: Record<string, string>;
  preferences: UserPreferences;
  conversations: Record<ConversationId, {
    lastReadMessage: OrNull<DocPath<'messages'>>;
  }>;
  defaultCommunity: OrNull<CommunityId>;
}>

export type UserPreferences = Immutable<{
  notifications: {
    all: boolean;
  };
}>;

export type UserLinks = Immutable<{
  instagram: OrNull<string>;
  linkedin: OrNull<string>;
  tiktok: OrNull<string>;
  website: OrNull<string>;
}>;

export type UserInterests = Immutable<{
  [key in UserInterest]: boolean;
}>;

export type ConversationDocumentData = Immutable<{
  category: ConversationCategory;
  description: OrNull<string>;
  photoUrl: OrNull<string>
  displayName: OrNull<string>;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  roles: Record<UserId, ConversationParticipantRole>;
  recentMessage: OrNull<MessageSubDocumentData & {
    path: DocPath<'messages'>;
  }>
}>;

export type MessageSubDocumentData = Immutable<SubCollectionOf<'conversations', {
  category: MessageCategory;
  content: string;
  createdAt: Timestamp;
  creatorPath: DocPath<'users'>;
  creatorDisplayName: string;
  creatorPhotoUrl: OrNull<string>
}>>;

export type CommunityDocumentData = Immutable<{
  displayName: string;
  bio: string;
  photoUrl: string;
  extendsGlobalFeed: boolean;
}>;

export type ContentMetadata = Immutable<{
  imageUrls: string[];
  videoUrl: OrNull<string>;
  taggedUsers: DocPath<'users'>[];
  links: string[];
}>;

export type ContentData<T extends ContentCategory> = Immutable<{
  category: T;
  metadata: ContentMetadata;
  creatorPath: DocPath<'users'>;
  createdAt: Timestamp;
  content: OrNull<string>;
  reactions: {
    [key in ContentReactionCode]: Array<DocPath<'users'>>;
  };
}>;

export type PostSubDocumentData = Immutable<SubCollectionOf<'communities', ContentData<ContentCategory.POST>>>;
export type CommentSubDocumentData = Immutable<SubCollectionOf<'posts', ContentData<ContentCategory.COMMENT>>>;
export type ReplySubDocumentData = Immutable<SubCollectionOf<'comments', ContentData<ContentCategory.REPLY>>>;


