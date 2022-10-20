import { CommunityContentId, CommunityId, Timestamp, UserId } from "../utility"

export type ReportDocumentData = {
  reporter: UserId;
  reportee: UserId;
  description: string;
  createdAt: Timestamp;
  resolved: boolean;
} & ({
  tag: 'content';
  reportedContent: CommunityContentId;
  communityId: CommunityId;
} | {
  tag: 'user';
  reportedContent: never;
  communityId: never;
})
