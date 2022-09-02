import dayjs from "dayjs";
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

import type { UnNullableTimestamp, TZCode, Timestamp as NullableTimestamp } from "../types";
import { Timestamp } from '@firebase/firestore';

dayjs.extend(utc);
dayjs.extend(timezone);

/**
 * @description Allows passing IANA Timezone code not listed in TZCode union. Should be used only for dynamically generated codes. 
 * */
 export const stringIsIanaTimezone = (str: string): TZCode => {
  const predicateStringIsIanaTimezone = (str: string): str is TZCode => typeof str === 'string';

  if (predicateStringIsIanaTimezone(str)) return str;

  return 'America/New_York';
}

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


export const formatCreationTimestamp = (
  createdAt: NullableTimestamp,
  maxDaysDisplay: number = 6 
): string => {
  if (createdAt === null) return '';

  const now = dayjs();
  const comparator = dayjs(createdAt.toMillis());
  const fullDate = comparator.format('MMM D, YYYY');

  if (now.diff(comparator, 'd') > maxDaysDisplay) {
    return fullDate;
  }

  const diffs = [
    ['d', now.diff(comparator, 'd')], 
    ['h', now.diff(comparator, 'h')], 
    ['m', now.diff(comparator, 'm')], 
  ] as const;

  let format: undefined | typeof diffs[number];

  for (const diff of diffs) {
    if (diff[1]) {
      format = diff;
      break;
    }
  }

  if (format === undefined) return 'now'; 

  const [postfix, count] = format;
  
  return `${count}${postfix} ago`;
}