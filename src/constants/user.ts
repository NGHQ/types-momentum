import { Role, UserInterest } from "../enum";
import { UserDocumentData } from "../types";

export const defaultUserInterests = {
  [UserInterest.COMMUNICATION]: false,
  [UserInterest.CONSULTING]: false,
  [UserInterest.CRYPTO]: false,
  [UserInterest.EDUCATION]: false,
  [UserInterest.ENERGY]: false,
  [UserInterest.ENTERTAINMENT]: false,
  [UserInterest.FASHION]: false,
  [UserInterest.FINANCE]: false,
  [UserInterest.FOOD]: false,
  [UserInterest.HEALTH]: false,
  [UserInterest.HOSPITALITY]: false,
  [UserInterest.MARKETING]: false,
  [UserInterest.NON_PROFIT]: false,
  [UserInterest.POLITICS]: false,
  [UserInterest.REAL_ESTATE]: false,
  [UserInterest.SOCIAL_MEDIA]: false,
  [UserInterest.SUSTAINABILITY]: false,
  [UserInterest.TECH]: false,
};


export const DaysOfWeek = {
  0: 'Sunday', 
  1: 'Monday', 
  2: 'Tuesday', 
  3: 'Wednesday', 
  4: 'Thursday', 
  5: 'Friday', 
  6: 'Saturday'
} as const;

export const defaultUserDocumentData: Omit<
  UserDocumentData, 
  'createdAt'
> = {
    email: null, 
    firstName: '', 
    lastName: '', 
    displayName: '', 
    username: '',
    role: {
      root: Role.OUTSIDER, 
      communities: {}
    },
    selectedCommunityId: null,
    bio: null, 
    photoUrl: null,
    links: {
      instagram: null, 
      linkedin: null, 
      tiktok: null, 
      website: null
    }, 
    interests: defaultUserInterests, 
    helpingHands: {}, 
    preferences: {
      notifications: {
        all: false 
      }, 
      hints: {
        showOnboarding: true, 
        showTipsControl: true
      },
      blockedUsers: [],
      onboarding: {
        dreamJobs: [], 
        dreamTeachers: [], 
        skills: []
      }
    }, 
    directline: {
      lastReadDialogue: null
    },
    conversations: {}, 
    /** @deprecated kept for backwards compat with app v2.1 */
    tips: {
      streakCount: 0, 
      dailyTipId: null,
      lastTipCompletedAt: null, 
      lastTipCompletedId: null, 
      record: {}, 
      runningStreak: [
        { didWatch: false, isoTime: '1970-01-01T00:00:00.000Z' },
        { didWatch: false, isoTime: '1970-01-01T00:00:00.000Z' },
        { didWatch: false, isoTime: '1970-01-01T00:00:00.000Z' },
        { didWatch: false, isoTime: '1970-01-01T00:00:00.000Z' },
        { didWatch: false, isoTime: '1970-01-01T00:00:00.000Z' },
        { didWatch: false, isoTime: '1970-01-01T00:00:00.000Z' },
        { didWatch: false, isoTime: '1970-01-01T00:00:00.000Z' },
      ]
    }, 
    userSurvey: {}
}
