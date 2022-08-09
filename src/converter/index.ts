import {Firestore, QueryDocumentSnapshot, PartialWithFieldValue} from '@google-cloud/firestore'

import { ContentCategory } from '../enum';
import type {
  UserDocumentData,
  RoleDocumentData, 
  CommunityDocumentData, 
  ContentDocumentData, 
  ConversationDocumentData, 
  FeedDocumentData, 
  MessageSubDocumentData, 
  PostSubDocumentData,
  ConversationId,
  FeedId
} from '../types';


export type CollectionPath = {
  users: UserDocumentData;
  communities: CommunityDocumentData;
  contents: ContentDocumentData<ContentCategory>;
  conversations: ConversationDocumentData;
  feeds: FeedDocumentData;
  roles: RoleDocumentData;
}

export type SubCollectionPath = {
  messages: MessageSubDocumentData;
  posts: PostSubDocumentData;
}

export type SubCollectionType<T extends keyof SubCollectionPath> = 
  T extends 'messages' ? {
    parent: 'conversations'
    parentType: CollectionPath['conversations'];
    parentDocId: ConversationId;
  } : {
    parent: 'feeds'
    parentType: CollectionPath['feeds'];
    parentDocId: FeedId;
  };

export const rootConverter = <T extends keyof CollectionPath>() => ({
  toFirestore: (data: PartialWithFieldValue<CollectionPath[T]>) => data,
  fromFirestore: (snapshot: QueryDocumentSnapshot<CollectionPath[T]>) => snapshot.data() as CollectionPath[T]
}); 

export const subConverter = <T extends keyof SubCollectionPath>() => ({
  toFirestore: (data: PartialWithFieldValue<SubCollectionPath[T]>) => data,
  fromFirestore: (snapshot: QueryDocumentSnapshot<SubCollectionPath[T]>) => snapshot.data() as SubCollectionPath[T]
}); 

export const momentumCollection = <T extends keyof CollectionPath>(
  firestore: Firestore,
  collectionPath: T
) => {
   return firestore.collection(collectionPath).withConverter<CollectionPath[T]>(rootConverter<T>());
}
