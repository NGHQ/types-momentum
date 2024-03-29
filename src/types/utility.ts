import type { FirestoreTimestamp as UnNullableTimestamp } from './timestamp';

import {
  CollectionRootPaths, 
  FirstDescendantPaths, 
} from '../enum';

type ImmutablePrimitive = undefined | null | boolean | string | number | Function;



export type Immutable<T> =
    T extends ImmutablePrimitive ? T :
    T extends Array<infer U> ? ImmutableArray<U> :
    T extends Map<infer K, infer V> ? ImmutableMap<K, V> :
    T extends Set<infer M> ? ImmutableSet<M> : ImmutableObject<T>;

export type ImmutableArray<T> = ReadonlyArray<Immutable<T>>;
export type ImmutableMap<K, V> = ReadonlyMap<Immutable<K>, Immutable<V>>;
export type ImmutableSet<T> = ReadonlySet<Immutable<T>>;
export type ImmutableObject<T> = { readonly [K in keyof T]: Immutable<T[K]> };

export type Mutable<T> = 
  T extends ImmutablePrimitive ? T :
  T extends ImmutableArray<infer U> ? Array<U> :
  T extends ImmutableMap<infer K, infer V> ? Map<K, V> :
  T extends ImmutableSet<infer M> ? Set<M> : MutableObject<T>;

export type MutableObject<T> = { [K in keyof T]: Mutable<T[K]> };

type ArrayLengthMutationKeys = 'splice' | 'push' | 'pop' | 'shift' | 'unshift' | number
type ArrayItems<T extends Array<unknown>> = T extends Array<infer TItems> ? TItems : never
export type FixedLengthArray<T extends unknown[]> =
  Pick<T, Exclude<keyof T, ArrayLengthMutationKeys>>
  & { [Symbol.iterator]: () => IterableIterator< ArrayItems<T> > }

export type OrNull<T> = T | null;

export type SubCollectionOf<P extends CollectionPaths, T> = T & {
  parentPath: DocPath<P>
}

export type { UnNullableTimestamp };
export type Timestamp = OrNull<UnNullableTimestamp>;

export type Flavoring<Flavor> = {
  _type?: Flavor;
}
export type Flavor<T, Flavor> = T & Flavoring<Flavor>;
export type DocumentId<S> = Flavor<string, S>;

export type CollectionPaths = keyof typeof CollectionRootPaths | keyof typeof FirstDescendantPaths;
export type DocPath<
  T extends CollectionPaths
> = Flavor<string, T>;

/** Document Aliases **/
export type UserId = DocumentId<'UserId'>;
export type RoleId = UserId;
export type PeerId = UserId;

export type CommunityId = DocumentId<'CommunityId'>;
export type CommunityContentId = DocumentId<'CommunityContentId'>;
export type NotificationId = DocumentId<'NotificationId'>;
export type PostId = CommunityContentId;
export type CommentId = CommunityContentId;
export type ReplyId = CommunityContentId;

export type DirectlineId = UserId;
export type DialogueId = DocumentId<'DialogueId'>;
export type ConversationId = DocumentId<'ConversationId'>;
export type MessageId = DocumentId<'MessageId'>;

export type TipId = DocumentId<'TipId'>;
export type UserSurveyId = DocumentId<'UserSurveyId'>;
export type PollId = DocumentId<'PollId'>;
export type GenreId = Flavor<string, 'GenreId'>
export type TagId = DocumentId<'TagId'>