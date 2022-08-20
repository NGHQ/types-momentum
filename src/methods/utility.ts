import { ContentCategory, ContentReactionCode } from "../enum";
import { 
  CommentId, 
  CommentSubDocumentData, 
  CommunityId, 
  ContentData, 
  ContentMetadata, 
  DocPath, 
  Immutable, 
  OrNull, 
  PostId, 
  PostSubDocumentData, 
  ReplySubDocumentData, 
  Timestamp, 
  UnNullableTimestamp,
  UserId
} from "../types";

export const getFlavoredValue = <O extends Record<string, unknown>>(
  object: O, id: keyof O
): Immutable<O[keyof O] | undefined> => {

  return object[id] as Immutable<O[keyof O] | undefined>;
};

type ContentCommonPayload = Immutable<{
  metadata?: {
    imageUrls?: string[];
    videoUrls?: string;
    taggedUsers?: DocPath<'users'>[];
    links?: string[];
  }, 
  creatorId: UserId;
  createdAt: UnNullableTimestamp;
  content: OrNull<string>;
}>;

type GenerateNewContentPayload<T extends ContentCategory> = ContentCommonPayload & (
  T extends ContentCategory.POST ? 
    { communityId: CommunityId; postId?: null; commentId?: null} : 
    T extends ContentCategory.COMMENT ? 
      { communityId: CommunityId; postId: PostId; commentId?: null} : 
      T extends ContentCategory.REPLY ? 
      { communityId: CommunityId; postId: PostId; commentId: CommentId} :
      { communityId: null; postId: null ; commentId: null} 
);

type GenerateNewContentReturn<T extends ContentCategory> = (
  T extends ContentCategory.POST ?
    PostSubDocumentData :
    T extends ContentCategory.COMMENT ?
      CommentSubDocumentData :
      T extends ContentCategory.REPLY ?
        ReplySubDocumentData :
        never
);

export const generateNewContent = <T extends ContentCategory>(category: T, payload: GenerateNewContentPayload<T>): GenerateNewContentReturn<T> => {
  const {communityId, postId, commentId, creatorId, content} = payload;
  const defaultMetadata: ContentMetadata = {
    imageUrls: [], 
    videoUrl: null, 
    taggedUsers: [], 
    links: []
  }
  const metadata: ContentMetadata = {
    ...defaultMetadata, 
    ...payload.metadata
  }
  let parentPath = `communities/${communityId}`;
  switch (category) {
    case ContentCategory.POST: 
      break;
    case ContentCategory.COMMENT: 
      parentPath = `${parentPath}/posts/${postId}`;
      break
    case ContentCategory.REPLY: 
      parentPath = `${parentPath}/posts/${postId}/comments/${commentId}`;
      break;
    default: 
      break;
  }

  const reactions: ContentData<ContentCategory>['reactions'] = {
    [ContentReactionCode.SPARKLING_HEART]: [],
    [ContentReactionCode.RAISING_HANDS]: [],
    [ContentReactionCode.ROCKET]: [],
    [ContentReactionCode.THINKING]: [],
    [ContentReactionCode.FOLDING_HANDS]: [], 
  }

  const createdAt = payload.createdAt as unknown as Timestamp;
  const creatorPath = `users/${creatorId}`;
  
  const res: GenerateNewContentReturn<T> = {
    category,
    createdAt, 
    creatorPath, 
    content,
    parentPath, 
    metadata,
    reactions, 
  } as unknown as GenerateNewContentReturn<T>;

  return res;
}