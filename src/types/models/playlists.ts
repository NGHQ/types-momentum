import { Timestamp, UserId } from "../utility";
import { TipStory, TipTag } from "./tips";

export type PlaylistDocumentData = {
    title: string;
    rank: number;
    quant: number;
    thumbnailUrl: string;
    creatorId: UserId;
    createdAt: Timestamp;
    isDraft: boolean;
}

export type UserTipDocumentData = {
    title: string;
    rank: number;
    playlistId: string;
    stories: TipStory[];
    tags: TipTag[];
    creatorId: UserId;
    createdAt: Timestamp;
    responseCount: number;
}