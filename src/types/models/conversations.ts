import {
  ConversationCategory,
  ConversationParticipantRole,
  MessageCategory, 

} from '../../enum';
import type {
  Immutable,
  OrNull, 
  DocPath,
  SubCollectionOf,
  Timestamp,
  UserId,
} from '../utility'

export type ConversationDocumentData = Immutable<{
  category: ConversationCategory;
  description: OrNull<string>;
  photoUrl: OrNull<string>
  displayName: OrNull<string>;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  roles: Record<UserId, ConversationParticipantRole>;
  recentMessage: OrNull<MessageSubDocumentData & {
    path: DocPath<'messages'>;
  }>
}>;

export type MessageSubDocumentData = Immutable<SubCollectionOf<'conversations', {
  category: MessageCategory;
  content: string;
  createdAt: Timestamp;
  creatorId: UserId;
  creatorDisplayName: string;
  creatorPhotoUrl: OrNull<string>
}>>;