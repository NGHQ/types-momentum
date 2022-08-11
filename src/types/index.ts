import type { Timestamp } from '@firebase/firestore';
import {
  Role,
  UserInterest,
  ConversationCategory,
  MessageCategory,
  ConversationParticipantRole,
  CommunityRole,
  UserCommunityStatus,
  ContentReactionCode,
  ContentCategory, 
  CollectionRootPaths, 
  FirstDescendantPaths, 
  SecondDescendantPaths, 
 ThirdDescendantPaths 
} from '../enum';

/** Utility */
export type OrNull<T> = T | null;
export type Flavoring<Flavor> = {
  _type?: Flavor;
}
export type Flavor<T, Flavor> = T & Flavoring<Flavor>;
export type SubCollectionOf<P extends CollectionPaths, T> = T & {
  parentPath: DocPath<P>
}



/** Document Aliases */
export type CollectionPaths = keyof typeof CollectionRootPaths
  | keyof typeof FirstDescendantPaths
  | keyof typeof SecondDescendantPaths
  | keyof typeof ThirdDescendantPaths

export type UserId = Flavor<string, 'UserId'>;
export type PeerId = Flavor<string, 'UserId'>;
export type ConversationId = Flavor<string, 'ConversationId'>;
export type CommunityId = Flavor<string, 'CommunityId'>;
export type MessageId = Flavor<string, 'MessageId'>;
export type PostId = Flavor<string, 'PostId'> 
export type CommentId = Flavor<string, 'CommentId'> 
export type ReplyId = Flavor<string, 'ReplyId'>;

export type DocPath<
  T extends CollectionPaths
> = Flavor<string, T>;

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
    lastReadMessage: OrNull<DocPath<'messages'>>
  }>
  communities: Record<CommunityId, DocPath<'communities'>>;
  defaultCommunity: OrNull<DocPath<'communities'>>;
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
  category: ConversationCategory;
  description: OrNull<string>;
  photoUrl: OrNull<string>
  displayName: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  roles: Record<UserId, ConversationParticipantRole>;
  recentMessage: OrNull<DocPath<'messages'>>;
}

export type MessageSubDocumentData = SubCollectionOf<'conversations', {
  category: MessageCategory;
  content: string;
  createdAt: Timestamp;
  creatorPath: DocPath<'users'>;
  creatorDisplayName: string;
  creatorPhotoUrl: OrNull<string>
}>

export type CommunityDocumentData = {
  displayName: string;
  bio: string;
  photoUrl: string;
  extendsGlobalFeed: boolean;
}

export type ContentMetadata = {
  imageUrls: string[];
  videoUrl: OrNull<string>;
  taggedUsers: DocPath<'users'>[];
  links: string[];
}

export type ContentData<T extends ContentCategory> = {
  category: T;
  metadata: ContentMetadata;
  creatorPath: DocPath<'users'>;
  createdAt: Timestamp;
  content: OrNull<string>;
  reactions: {
    [key in ContentReactionCode]: Array<DocPath<'users'>>;
  };
  
}

export type PostSubDocumentData = SubCollectionOf<'communities', ContentData<ContentCategory.POST>>;
export type CommentSubDocumentData = SubCollectionOf<'posts', ContentData<ContentCategory.COMMENT>>;
export type ReplySubDocumentData = SubCollectionOf<'comments', ContentData<ContentCategory.REPLY>>;


