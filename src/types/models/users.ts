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
  SubCollectionOf,
} from './../utility'
import { OnboardingMetaDocumentData } from './meta';
import { UserSurveyChoice } from './tips';

export type UserRole = {
  root: Role;
  communities: Record<CommunityId, {
    role: CommunityRole,
    status: UserCommunityStatus
  }>;
};

/**@deprecated use user subcollection */
export type UserTipsDocumentData = UserTips;

export type UserDocumentData = {
  role: UserRole;
  username: string;
  firstName: string;
  lastName: string;
  email: OrNull<string>;
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
  createdAt: Timestamp;
};

export type UserPreferences = {
  notifications: {
    playerId?: string;
    all: boolean;
  };
  hints: {
    showOnboarding: boolean;
    showTipsControl: boolean;
  };
  blockedUsers: UserId[];
  onboarding: {
    question1: OnboardingAnswer;
    question2: OnboardingAnswer;
    question3: OnboardingAnswer;
  }
};

export type OnboardingAnswer = {
  options: string[];
  question: string;
}

export type UserLinks = {
  instagram: OrNull<string>;
  linkedin: OrNull<string>;
  tiktok: OrNull<string>;
  website: OrNull<string>;
};

export type UserInterests = {
  [key in UserInterest]: boolean;
};

export type DayStreak = {
  didWatch: boolean; 
  isoTime: string;
}

export type UserTips = {
  streakCount: number;
  runningStreak: FixedLengthArray<[
    DayStreak,
    DayStreak,
    DayStreak,
    DayStreak,
    DayStreak,
    DayStreak,
    DayStreak,
  ]>;
  lastCompletedTip: OrNull<{
    completedQuant: number;
    playlistQuant: number;
    tipTitle: string;
    playlistId: string;
    completedAt: Timestamp;
    tipId: string;
  }>;
  bookmarkedTips: Array<{
    tipId: string;
    title: string;
  }>;
   /**@deprecated */
   dailyTipId: OrNull<TipId>;
};

/** @description  subcollection key = 'userPlaylistRecords, document key = [PlaylistId] */
export type UserPlaylistRecordSubDocumentData = SubCollectionOf<'users', {
  completedIds: Record<TipId, boolean>;
}>;


export type UserPreview = Pick<
  UserDocumentData,
  'displayName' |
  'firstName' |
  'lastName' |
  'photoUrl'
> & { id: UserId }



/** @description Psuedo Document Model type. Reflects read access rules when requester.id !== userId */
export type PeerDocumentData = Pick<
  UserDocumentData,
  'displayName' |
  'firstName' |
  'lastName' |
  'photoUrl' |
  'email' |
  'links' |
  'interests' |
  'helpingHands' |
  'bio' |
  'role'
> & { id: UserId }
