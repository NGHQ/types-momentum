import { TipDocumentData } from './models/tips';
import { PeerDocumentData, UserPreview } from './models/users';
import { CommunityId, TipId, UserId } from './utility';


export type CallSuccess<T extends unknown> = {
    status: 'success';
    data: T;
}

export type CallError = {
    status: 'error';
    data: string;
};

export type CallableResponse<T extends unknown> = {
  data: CallSuccess<T> | CallError;
};

export type Callable<T extends object, R extends unknown> = (params: T) => Promise<CallableResponse<R>>;

export type AllCallables = {
  'callHealth': CallHealth; 
  'callUpdateGenreTipCount': CallUpdateGenreTipCount;
  'callGetRandomTips': CallGetRandomTips;
  'callCheckEmailInCulled': CallCheckEmailInCulled;
  'callGetCommunityMemberPreviews': CallGetCommunityMemberPreviews;
  'callGetPeerDocument': CallGetPeerDocument;
}

export type CallHealth = Callable<
  {}, 
  string 
>;
export type CallUpdateGenreTipCount = Callable<
  {
    genreId: string;
  }, 
  undefined
>;

export type CallGetRandomTips = Callable<
  {
    exclude: TipId[];
    community: CommunityId;
  }, 
  TipDocumentData[]
>;

export type EmailInCulledResponse = {
  created: boolean;
  inCulled: true;
  waitListStatus: 'na'
} | {
  created: boolean;
  inCulled: false;
  waitListStatus: 'alreadyAdded' | 'added' | 'notAdded'
}

export type CallCheckEmailInCulled = Callable<
  {
    email: string;
  },
  EmailInCulledResponse
>;

export type CallGetCommunityMemberPreviews = Callable<
  {
    startAfter?: UserId;
    limit?: number;
    communityId: CommunityId;
  }, 
  UserPreview[]
>;

export type CallGetPeerDocument = Callable<
  {
    userId: UserId;
  },
  PeerDocumentData
>;