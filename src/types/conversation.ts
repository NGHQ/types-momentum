import type { Timestamp } from 'firebase/firestore';

import {
  ConversationCategory,
  MessageCategory,
  ConversationParticipantRole
} from '../enum';
import { UserId } from './alias';

export type ConversationDocumentData = {
  type: ConversationCategory;
  photoUrl: string | null;
  displayName: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  roles: Record<UserId, ConversationParticipantRole>;
  recentMessage: MessageDocumentData;
}


export type MessageDocumentData = {
  type: MessageCategory;
  content: string;
  createdAt: Timestamp;
  creatorId: UserId;
  creatorDisplayName: string;
  creatorPhotoUrl: string | null;
}
