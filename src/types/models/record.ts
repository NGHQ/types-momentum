import { FixedLengthArray, OrNull, Timestamp, TipId } from "../utility";

export type RecordDocumentData = {
  streakCount: number;
  runningStreak: FixedLengthArray<[
    boolean,
    boolean,
    boolean,
    boolean,
    boolean,
    boolean,
    boolean,
  ]>;
  dailyTipId: OrNull<TipId>;
  lastTipCompletedAt: Timestamp;
  lastTipCompletedId: OrNull<TipId>;
  record: Record<TipId, {
    completed: boolean;
    completedAt: Timestamp;
    bookmarked: boolean;
    lastShownAsDailyTipAt: Timestamp;
    lastSeen: Timestamp;
  }>;
};