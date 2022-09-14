import { ConversationCategory, MessageCategory } from "../../enum"
import type {
  OrNull, 
  SubCollectionOf, 
  Timestamp, 
  DocPath,
  UserId
} from '../utility';
import { Reactions } from "./communities";

export type DirectlineDocumentData = {
  category: ConversationCategory.LINE;
  description: OrNull<string>;
  photoUrl: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  recentMessage: OrNull<DialogueDocumentData & {
    path: DocPath<'dialogue'>;
    seenByAdmin: boolean;
  }>;
}

export type DialogueDocumentData = SubCollectionOf<'directlines', {
  category: MessageCategory;
  content: string;
  createdAt: Timestamp;
  creatorId: UserId;
  createdByAdmin: boolean;
  creatorDisplayName: string;
  creatorPhotoUrl: OrNull<string>;
  reactions: Reactions;
}>