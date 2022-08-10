import {QueryDocumentSnapshot, PartialWithFieldValue } from '@firebase/firestore';

import type {
  UserDocumentData,
  RoleDocumentData, 
  CommunityDocumentData, 
  ConversationDocumentData, 
  MessageSubDocumentData, 
  PostSubDocumentData,
  ConversationId,
  CommunityId,
  PostId,
  MessageId,
} from '../types';


export type RootCollections = {
  users: UserDocumentData;
  communities: CommunityDocumentData;
  conversations: ConversationDocumentData;
  roles: RoleDocumentData;
}

export type SubCollections = {
  messages: { 
    type: MessageSubDocumentData;
    idFlavor: MessageId;
    parent: 'conversations';
    parentIdFlavor: ConversationId
  }
  posts:{
    type: PostSubDocumentData;
    idFlavor: PostId;
    parent: 'communities'
    parentIdFlavor: CommunityId;
  }
}

export const rootConverter = <T extends keyof RootCollections>() => ({
  toFirestore: (data: PartialWithFieldValue<RootCollections[T]>) => data,
  fromFirestore: (snapshot: QueryDocumentSnapshot<RootCollections[T]>) => snapshot.data() 
}); 

export const subConverter = <T extends keyof SubCollections>() => ({
  toFirestore: (data: PartialWithFieldValue<SubCollections[T]['type']>) => data,
  fromFirestore: (snapshot: QueryDocumentSnapshot<SubCollections[T]['type']>) => snapshot.data() 
}); 

// TODO Only valid for v9
// export const momentumCollection = <T extends keyof RootCollections>(
//   firestore: Firestore,
//   collectionPath: T
// ) => {
//    return firestore.collection(collectionPath).withConverter<RootCollections[T]>(rootConverter<T>());
// }
