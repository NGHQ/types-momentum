import { CommunityContentId, UserId } from "../utility"

export type ReportDocumentData = {
  reporter: UserId;
  reportee: UserId;
  reportedContentId?: CommunityContentId;
  description: string;
}