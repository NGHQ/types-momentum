import {
  ContentCategory,
  ContentReactionCode,
} from '../../enum';
import type {
  OrNull, 
  CommunityId, 
  SubCollectionOf,
  Timestamp,
  UserId,
  PostId,
  CommentId, 
} from '../utility'


export type CommunityDocumentData = {
  displayName: string;
  bio: string;
  photoUrl: string;
  extendsGlobalFeed: boolean;
};

export type ContentMetadata = {
  imageUrls: string[];
  videoUrl: OrNull<string>;
  taggedUserIds: UserId[];
  links: string[];
};

export type Reactions = {
  [key in ContentReactionCode]: UserId[];
}

export type ContentData<T extends ContentCategory> = SubCollectionOf<'communities', {
  category: T;
  metadata: ContentMetadata;
  creatorId: UserId;
  createdAt: Timestamp;
  content: OrNull<string>;
  reactions: Reactions;
  responseOfId: T extends ContentCategory.POST ? 
    CommunityId : 
    T extends ContentCategory.COMMENT ? 
      PostId : 
      T extends ContentCategory.REPLY ? 
        CommentId : 
        never
}>;

export type PostSubDocumentData = ContentData<ContentCategory.POST>;
export type CommentSubDocumentData = ContentData<ContentCategory.COMMENT>;
export type ReplySubDocumentData = ContentData<ContentCategory.REPLY>;


