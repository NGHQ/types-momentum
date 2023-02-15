import { SubCollectionOf, Timestamp, UserId } from "../utility";
import { TipStory, TipTag } from "./tips";

/** @note rank < 0 signifies in draft status previously isDraft = true**/
export type PlaylistDocumentData = {
  title: string;
  rank: number;
  totalTipCount: number;
  thumbnailUrl: string;
  creatorId: UserId;
  createdAt: Timestamp;
  /**@deprecated */
  isDraft: boolean;
}

/** @description  subcollection key = 'tips', document key = [TipId] */
export type TipSubDocumentData = SubCollectionOf<'playlists', {
  title: string;
  rank: number;
  playlistId: string;
  stories: TipStory[];
  tags: TipTag[];
  creatorId: UserId;
  createdAt: Timestamp;
}>;