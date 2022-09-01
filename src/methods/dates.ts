import dayjs from "dayjs";
import { UnNullableTimestamp } from "../types";
import { Timestamp } from '@firebase/firestore';

export const daysDiffFromNow = (now: UnNullableTimestamp , lastTipCompletedAt: UnNullableTimestamp): number => {
  const present = dayjs(now.toMillis());
  const comparator = dayjs(lastTipCompletedAt.toMillis());
  return present.diff(comparator, 'd');
}

type StreakStateAfterCompletionResult = {
  newLastTipCompletedAt: UnNullableTimestamp;
  streakCountShould: 'stay' | 'zero' | 'increment';
}

export const streakStateAfterCompletion = (lastTipCompletedAt: UnNullableTimestamp): StreakStateAfterCompletionResult  => {
  const newLastTipCompletedAt = Timestamp.now();
  const daysDiff = daysDiffFromNow(newLastTipCompletedAt, lastTipCompletedAt);
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