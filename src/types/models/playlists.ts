import { SubCollectionOf, Timestamp, UserId } from "../utility";
import { TipStory, TipTag } from "./tips";

export type PlaylistDocumentData = {
  title: string;
  rank: number;
  totalTipCount: number;
  thumbnailUrl: string;
  creatorId: UserId;
  createdAt: Timestamp;
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