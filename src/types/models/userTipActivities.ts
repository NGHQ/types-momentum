import { PlaylistId, TipId } from "../utility"


export type UserTipActivityDocumentData = {
    bookmarked: TipId[]
    lastCompletedTip: {
        completedQuant: number,
        playlistQuant: number,
        tipTitle: string,
        playlistId: string,
        tipId: string,
    },
    record: Record<PlaylistId, {
        tipsCompletedQuant: number;
        completedTips: TipId[];
    }>
}