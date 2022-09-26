import type { HttpsCallable, HttpsCallableOptions } from '@firebase/functions';
import { TipDocumentData } from './models/tips';
import { CommunityId, TipId } from './utility';

export type GetCallable = (name: string, options?: HttpsCallableOptions) => HttpsCallable 

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