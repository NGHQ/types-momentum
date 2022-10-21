import {
  Role, 
  CommunityRole, 
  UserCommunityStatus,
  UserInterest,
} from '../../enum';

import type {
  OrNull, 
  CommunityId, 
  ConversationId, 
  DocPath,
  TipId,
  Timestamp,
  FixedLengthArray,
  UserSurveyId,
  UserId,
} from './../utility'
import { UserSurveyChoice } from './tips';

export type UserRole = {
  root: Role;
  communities: Record<CommunityId, {
    role: CommunityRole, 
    status: UserCommunityStatus
  }>;
};

export type UserDocumentData = {
  role: UserRole;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  displayName: string;
  bio: OrNull<string>;
  photoUrl: OrNull<string>;
  links: UserLinks;
  interests: UserInterests;
  helpingHands: Record<string, string>;
  preferences: UserPreferences;
  directline: {
    lastReadDialogue: OrNull<DocPath<'dialogue'>>;
  };
  conversations: Record<ConversationId, {
    lastReadMessage: OrNull<DocPath<'messages'>>;
    pinned: boolean; 
  }>;
  selectedCommunityId: OrNull<CommunityId>;
  tips: UserTips;
  userSurvey: Record<UserSurveyId, {
    '0': UserSurveyChoice;
    '25': UserSurveyChoice;
    '100': UserSurveyChoice;
    '150': UserSurveyChoice;
    '200': UserSurveyChoice;
  }>;
};

export type UserPreferences = {
  notifications: {
    all: boolean;
  };
  hints: {
    showOnboarding: boolean;
    showTipsControl: boolean;
  };
  blockedUsers: UserId[];
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
  runningStreak: FixedLengthArray<[
    boolean, 
    boolean, 
    boolean, 
    boolean, 
    boolean, 
    boolean, 
    boolean, 
  ]>;
  dailyTipId: OrNull<TipId>;
  lastTipCompletedAt: Timestamp; 
  lastTipCompletedId: OrNull<TipId>;
  record: Record<TipId, {
    completed: boolean;
    completedAt: Timestamp;
    bookmarked: boolean;
    lastShownAsDailyTipAt: Timestamp;
    lastSeen: Timestamp;
  }>;
};

export type UserPreview = Pick<
  UserDocumentData, 
  'photoUrl' | 
  'displayName' | 
  'firstName' |
  'lastName'
> & {id: UserDocumentData}


/** @description Psuedo Document Model type. Reflects read access rules when requester.id !== userId */
export type PeerDocumentData = Pick<
  UserDocumentData,
  'role' |
  'username' | 
  'firstName' | 
  'lastName' | 
  'email' | 
  'displayName' | 
  'bio' | 
  'photoUrl' 
>;
