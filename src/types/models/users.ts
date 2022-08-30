import {
  Role, 
  CommunityRole, 
  UserCommunityStatus,
  UserInterest,
} from '../../enum';

import type {
  Immutable,
  OrNull, 
  CommunityId, 
  ConversationId, 
  DocPath,
  TipId,
  Timestamp,
} from './../utility'

export type RoleDocumentData = Immutable<{
  root: Role;
  communities: Record<CommunityId, {
    role: CommunityRole, 
    status: UserCommunityStatus
  }>;
}>;

export type UserDocumentData = Immutable<{
  username: string;
  email: string;
  displayName: OrNull<string>;
  bio: OrNull<string>;
  photoUrl: OrNull<string>;
  links: UserLinks;
  interests: UserInterests;
  helpingHands: Record<string, string>;
  preferences: UserPreferences;
  conversations: Record<ConversationId, {
    lastReadMessage: OrNull<DocPath<'messages'>>;
    pinned: boolean; 
  }>;
  selectedCommunityId: OrNull<CommunityId>;
  /**@deprecated use selectedCommunityId */
  defaultCommunity: OrNull<CommunityId>;
  tips: UserTips;
}>

export type UserPreferences = {
  notifications: {
    all: boolean;
  };
};

export type UserLinks = {
  instagram: OrNull<string>;
  linkedin: OrNull<string>;
  tiktok: OrNull<string>;
  website: OrNull<string>;
};

export type UserInterests = {
  [key in UserInterest]: boolean;
};

export type UserTips = {
  streakCount: number;
  lastTipCompletedAt: Timestamp; 
  lastTipCompletedId: OrNull<TipId>;
  record: Record<TipId, {
    completed: boolean;
    completedAt: Timestamp;
    bookmarked: boolean;
    lastShownAsDailyTipAt: Timestamp;
  }>;
};

/** @description Psuedo Document Model type. Reflects read access rules when requester.id !== userId */
export type PeerDocumentData = Omit<UserDocumentData, 'preferences' | 'conversations'>;
