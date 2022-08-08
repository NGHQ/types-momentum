import { UserInterest } from "../enum";
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

export const defaultUserDocumentData: Omit<
  UserDocumentData, 
  'username' 
> = {
    bio: null, 
    displayName: null, 
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
      }
    }, 
    communities: {}, 
    conversations: {}, 
    defaultCommunity: null, 
}
