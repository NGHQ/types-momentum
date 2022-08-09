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

type MomentumCollection =
  UserDocumentData |
  CommunityDocumentData |
  ContentDocumentData<ContentCategory> | 
  ConversationDocumentData | 
  FeedDocumentData |
  RoleDocumentData; 

type MomentumSubCollection = 
  MessageSubDocumentData | 
  PostSubDocumentData;

type CollectionPath<T extends MomentumCollection> = 
  T extends UserDocumentData ? 'users' :
  T extends CommunityDocumentData ? 'communities' :
  T extends ContentDocumentData<ContentCategory> ? 'contents' :
  T extends ConversationDocumentData ? 'conversations' :
  T extends FeedDocumentData ? 'feeds' :
  T extends RoleDocumentData? 'roles' :
  never;

type SubCollectionType<T extends MomentumSubCollection> = 
  T extends MessageSubDocumentData ? {
    parent: CollectionPath<ConversationDocumentData>;
    child: 'messages';
    parentType: ConversationDocumentData;
    parentDocId: ConversationId;
  } :
  T extends PostSubDocumentData ?  {
    parent: CollectionPath<FeedDocumentData>;
    child: 'posts';
    parentType: FeedDocumentData;
    parentDocId: FeedId;
  }  : {
    parent: never;
    child: never;
    parentType: never;
    parentDocId: never;
  };


export const typedConverter = <T extends MomentumCollection | MomentumSubCollection>() => ({
  toFirestore: (data: PartialWithFieldValue<T>) => data,
  fromFirestore: (snapshot: QueryDocumentSnapshot<T>) => snapshot.data() as T
}); 

export const momentumCollection = <T extends MomentumCollection, P extends CollectionPath<T> = CollectionPath<T>>(
  firestore: Firestore,
  collectionPath: P
) => {
   return firestore.collection(collectionPath).withConverter<T>(typedConverter<T>());
}

export const momentumSubCollection = <
  T extends MomentumSubCollection,
  S extends SubCollectionType<T> = SubCollectionType<T>, 
>(
  firestore: Firestore,
  subCollectionPath: S['child'], 
  parentId: S['parentDocId']
) => {
  const p = subCollectionPath === 'messages' ? 'conversations' : 'feeds';
   return firestore.
      collection(p).
      withConverter<S['parentType']>(typedConverter<S['parentType']>()).
      doc(parentId).
      collection(subCollectionPath).
      withConverter<T>(typedConverter<T>());
}

