import {
  ContentCategory,
  ContentReactionCode,
} from '../../enum';
import type {
  Immutable,
  OrNull, 
  CommunityId, 
  SubCollectionOf,
  Timestamp,
  UserId,
  PostId,
  CommentId, 
} from '../utility'


export type CommunityDocumentData = Immutable<{
  displayName: string;
  bio: string;
  photoUrl: string;
  extendsGlobalFeed: boolean;
}>;

export type ContentMetadata = {
  imageUrls: string[];
  videoUrl: OrNull<string>;
  taggedUserIds: UserId[];
  links: string[];
};

export type ContentData<T extends ContentCategory> = SubCollectionOf<'communities', {
  category: T;
  metadata: ContentMetadata;
  creatorId: UserId;
  createdAt: Timestamp;
  content: OrNull<string>;
  reactions: {
    [key in ContentReactionCode]: UserId[];
  };
  responseOfId: T extends ContentCategory.POST ? 
    CommunityId : 
    T extends ContentCategory.COMMENT ? 
      PostId : 
      T extends ContentCategory.REPLY ? 
        CommentId : 
        never
}>;

export type PostSubDocumentData = Immutable<ContentData<ContentCategory.POST>>;
export type CommentSubDocumentData = Immutable<ContentData<ContentCategory.COMMENT>>;
export type ReplySubDocumentData = Immutable<ContentData<ContentCategory.REPLY>>;


