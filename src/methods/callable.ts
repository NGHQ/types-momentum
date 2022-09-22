import { CallError, CallSuccess, GetCallable, AllCallables } from "../types"
import type { HttpsCallableOptions } from '@firebase/functions-types';

export const callRespondWithSuccess = <T extends object>(data: T): CallSuccess<T> => {
  return {
    status: 'success', 
    data
  }
}

export const callRespondWithError = (message: string): CallError => {
  return {
    status: 'error', 
    data: message
  }
}

export const typedCallable = <F extends keyof AllCallables>(
  callable: F,
  httpsCallable: GetCallable,
  httpsCallableOptions?: HttpsCallableOptions
): AllCallables[F] => {
  const res = httpsCallable(callable, httpsCallableOptions) as unknown as AllCallables[F]

  return res;
}