import {
  ConversationCategory,
  ConversationParticipantRole,
  MessageCategory, 
} from '../../enum';
import type {
  OrNull, 
  DocPath,
  SubCollectionOf,
  Timestamp,
  UserId,
} from '../utility'
import type {
  Reactions
} from './communities';
import { UserPreview } from './users';

export type ConversationDocumentData = {
  category: ConversationCategory;
  description: OrNull<string>;
  photoUrl: OrNull<string>;
  displayName: OrNull<string>;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  roles: Record<UserId, {
    role: ConversationParticipantRole
  } & UserPreview>;
  recentMessage: OrNull<MessageSubDocumentData & {
    path: DocPath<'messages'>;
  }>;
};

export type MessageSubDocumentData = SubCollectionOf<'conversations', {
  category: MessageCategory;
  content: string;
  createdAt: Timestamp;
  creatorId: UserId;
  creatorDisplayName: string;
  creatorPhotoUrl: OrNull<string>;
  reactions: Reactions;
}>;