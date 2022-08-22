import { ContentCategory, ContentReactionCode } from "../enum";
import { 
  CommentId, 
  CommunityId, 
  ContentData, 
  ContentMetadata, 
  Immutable, 
  OrNull, 
  PostId, 
  UnNullableTimestamp,
  UserId, 
  StoreSchema, 
  EntityWithId
} from "../types";

/* ------ Generic Redux-Firebase Utilities ------ */
type EmptyMappedDataGenerator<S extends StoreSchema> = <K extends keyof S>() => Immutable<Record<string, S[K]>>;
type EmptyMappedOrderedDataGenerator<S extends StoreSchema> = <K extends keyof S>() => Immutable<Array<EntityWithId<S[K]>>>;
export const createEmptyFirestoreMappedDataGenerator = <
  MappedData extends StoreSchema
>(): { 
  emptyMappedDataOf: EmptyMappedDataGenerator<MappedData>; 
  emptyMappedOrderedDataOf: EmptyMappedOrderedDataGenerator<MappedData>;
} => {
  const emptyMappedDataOf: EmptyMappedDataGenerator<MappedData> = <K extends keyof MappedData>() => {
    const typedEmptyData: Immutable<Record<string, MappedData[K]>> = {};
    return typedEmptyData;
  }

  const emptyMappedOrderedDataOf: EmptyMappedOrderedDataGenerator<MappedData> = <K extends keyof MappedData>() => {
    const typedEmptyOrderedData: Immutable<Array<EntityWithId<MappedData[K]>>> = [];
    return typedEmptyOrderedData;
  }
  return {
    emptyMappedDataOf, 
    emptyMappedOrderedDataOf
  }
};

/**
 * @deprecated Obtain the same result by turning on ts-configurations for `strictNullChecks` & `noUncheckedIndexedAccess`
 * @param object 
 * @param id 
 * @returns typeof obect[id] | undefined
 */
export const getFlavoredValue = <O extends Record<string, unknown>>(
  object: O, id: keyof O
): Immutable<O[keyof O] | undefined> => {

  return object[id] as Immutable<O[keyof O] | undefined>;
};



/* ----- Momentum Specific Utilities ----- */
export type ContentCommonPayload<T extends ContentCategory> = {
  metadata?: {
    imageUrls?: string[];
    videoUrls?: string;
    taggedUserIds?: UserId[];
    links?: string[];
  }, 
  creatorId: UserId;
  createdAt: UnNullableTimestamp;
  content: OrNull<string>;
  communityId: CommunityId;
  responseOfId: T extends ContentCategory.POST ? 
  CommunityId : 
  T extends ContentCategory.COMMENT ? 
    PostId : 
    T extends ContentCategory.REPLY ? 
      CommentId : 
      never
};



export const generateNewContent = <T extends Immutable<ContentCategory>>(category: T, payload: ContentCommonPayload<T>): ContentData<T> => {
  const {creatorId, content, communityId, createdAt, responseOfId} = payload;
  const defaultMetadata: ContentMetadata = {
    imageUrls: [], 
    videoUrl: null, 
    taggedUserIds: [], 
    links: []
  }
  const metadata: ContentMetadata = {
    ...defaultMetadata, 
    ...payload.metadata
  }
  const parentPath = `communities/${communityId}`;

  const reactions: ContentData<ContentCategory>['reactions'] = {
    [ContentReactionCode.SPARKLING_HEART]: [],
    [ContentReactionCode.RAISING_HANDS]: [],
    [ContentReactionCode.ROCKET]: [],
    [ContentReactionCode.THINKING]: [],
    [ContentReactionCode.FOLDING_HANDS]: [], 
  }

  const res: ContentData<T> = {
    category,
    createdAt, 
    creatorId, 
    content,
    parentPath, 
    metadata,
    reactions, 
    responseOfId
  } 

  return res;
}