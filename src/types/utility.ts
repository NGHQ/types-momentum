import type { Timestamp as UnNullableTimestamp } from '@firebase/firestore';

import {
  CollectionRootPaths, 
  FirstDescendantPaths, 
  SecondDescendantPaths, 
  ThirdDescendantPaths 
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

export type OrNull<T> = T | null;
export type Flavoring<Flavor> = {
  _type?: Flavor;
}
export type Flavor<T, Flavor> = T & Flavoring<Flavor>;
export type SubCollectionOf<P extends CollectionPaths, T> = T & {
  parentPath: DocPath<P>
}

export type { UnNullableTimestamp };
export type Timestamp = OrNull<UnNullableTimestamp>;

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