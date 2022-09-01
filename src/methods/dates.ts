import dayjs from "dayjs";
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

import type { UnNullableTimestamp, TZCode } from "../types";
import { Timestamp } from '@firebase/firestore';

dayjs.extend(utc);
dayjs.extend(timezone);

export const daysDiffFromNow = (
  now: UnNullableTimestamp,
  lastTipCompletedAt: UnNullableTimestamp,
  timezone: TZCode
): number => {
  const today = dayjs(now.toMillis()).tz(timezone).startOf('d');
  const comparator = dayjs(lastTipCompletedAt.toMillis()).tz(timezone).startOf('d');
  return today.diff(comparator, 'd');
}

type StreakStateAfterCompletionResult = {
  newLastTipCompletedAt: UnNullableTimestamp;
  streakCountShould: 'stay' | 'zero' | 'increment';
}

export const streakStateAfterCompletion = (
  lastTipCompletedAt: UnNullableTimestamp,
  timezone: TZCode 
): StreakStateAfterCompletionResult  => {
  const newLastTipCompletedAt = Timestamp.now();
  const daysDiff = daysDiffFromNow(newLastTipCompletedAt, lastTipCompletedAt, timezone);
  const res = (
    streakCountShould: StreakStateAfterCompletionResult['streakCountShould']
  ): StreakStateAfterCompletionResult => {
    return {
      newLastTipCompletedAt, 
      streakCountShould
    }
  };

  switch (true) {
    case (daysDiff <= 0): 
      return res('stay');
    case (daysDiff === 1):
      return res('increment')
    default:
      return res('zero')
  }
}

/**
 * @description Allows passing IANA Timezone code not listed in TZCode union. Should be used only for dynamically generated codes. 
 * */
export const stringIsIanaTimezone = (str: string): TZCode => {
  const predicateStringIsIanaTimezone = (str: string): str is TZCode => typeof str === 'string';

  if (predicateStringIsIanaTimezone(str)) return str;

  return 'America/New_York';
}