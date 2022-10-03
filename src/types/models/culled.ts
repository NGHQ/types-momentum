import { CommunityId, OrNull, UserId } from "../utility";

export type CulledDocumentData = {
  email: string;
  community: CommunityId;
  firstName: string;
  lastName: string;
  userDocId: OrNull<UserId>;
}