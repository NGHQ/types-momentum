import { CallError, CallSuccess, AllCallables } from "../types"

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

export const parseCallableResult = <
  T extends keyof AllCallables,
  R extends Awaited<ReturnType<AllCallables[T]>>['data']
>(result: R): R => {
  const r = result as unknown as string;
  const res: R = JSON.parse(r);

  return res;
}