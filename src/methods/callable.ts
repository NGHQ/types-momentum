import { CallError, CallSuccess, AllCallables } from "../types"
import type { HttpsCallableOptions, httpsCallable as _httpsCallable, Functions} from '@firebase/functions';

export const callRespondWithSuccess = <T extends unknown>(data: T): CallSuccess<T> => {
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
  httpsCallable: typeof _httpsCallable,
  functionsInstance: Functions,
  httpsCallableOptions?: HttpsCallableOptions
): AllCallables[F] => {
  const res = httpsCallable(functionsInstance, callable, httpsCallableOptions) as unknown as AllCallables[F]

  return res;
}