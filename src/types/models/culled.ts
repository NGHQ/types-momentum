import { CommunityRole, WaitListApproval } from "../../enum";
import { CommunityId, OrNull, UserId } from "../utility";

export type CulledDocumentData = {
  email: string;
  community: CommunityId;
  communityRole: CommunityRole;
  firstName: string;
  lastName: string;
  /**@deprecated */
  userDocId: OrNull<UserId>;
}

  /**@deprecated */
export type WaitListDocumentData = {
  email: string;
  firstName: string;
  lastName: string;
  approved: WaitListApproval;
  userDocId: OrNull<UserId>;
}