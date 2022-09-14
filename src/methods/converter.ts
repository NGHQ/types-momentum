import {Firestore, QueryDocumentSnapshot, PartialWithFieldValue} from '@google-cloud/firestore';
import { ContentCategory } from '../enum';

import type {
  UserDocumentData,
  RoleDocumentData, 
  CommunityDocumentData, 
  ConversationDocumentData, 
  MessageSubDocumentData, 
  PostSubDocumentData,
  GenreDocumentData, 

  ConversationId,
  CommunityId,
  PostId,
  MessageId,
  TipDocumentData,
  PollDocumentData,
  DirectlineDocumentData,
  DialogueSubDocumentData,
  DialogueId,
  DirectlineId,
  ContentData,
  CommentSubDocumentData,
  ReplySubDocumentData,
  CommunityContentId,
} from '../types';



type RootCollections = {
  users: UserDocumentData;
  communities: CommunityDocumentData;
  conversations: ConversationDocumentData;
  roles: RoleDocumentData;
  genres: GenreDocumentData;
  tips: TipDocumentData;
  polls: PollDocumentData;
  directlines: DirectlineDocumentData;
}

type SubCollections = {
  messages: { 
    type: MessageSubDocumentData;
    idFlavor: MessageId;
    parent: 'conversations';
    parentIdFlavor: ConversationId;
  };
  contents:{
    type: PostSubDocumentData | CommentSubDocumentData | ReplySubDocumentData;
    idFlavor: CommunityContentId;
    parent: 'communities';
    parentIdFlavor: CommunityId;
  };
  dialogue: {
    type: DialogueSubDocumentData;
    idFlavor: DialogueId;
    parent: 'directlines';
    parentIdFlavor: DirectlineId;
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

export const momentumCollectionV9 = <T extends keyof RootCollections>(
  firestore: Firestore,
  collectionPath: T
) => {
   return firestore.collection(collectionPath).withConverter<RootCollections[T]>(rootConverter<T>());
}
