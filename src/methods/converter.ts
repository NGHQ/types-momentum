import type {
  UserDocumentData,
  CommunityDocumentData,
  ConversationDocumentData,
  MessageSubDocumentData,
  PostSubDocumentData,
  GenreDocumentData,
  ConversationId,
  CommunityId,
  MessageId,
  TipDocumentData,
  PollDocumentData,
  DirectlineDocumentData,
  DialogueSubDocumentData,
  DialogueId,
  DirectlineId,
  CommentSubDocumentData,
  ReplySubDocumentData,
  CommunityContentId,
  UserTipsDocumentData,
} from "../types";

// TODO Needs updating with current models
export type RootCollections = {
  users: UserDocumentData;
  communities: CommunityDocumentData;
  conversations: ConversationDocumentData;
  genres: GenreDocumentData;
  tips: TipDocumentData;
  polls: PollDocumentData;
  directlines: DirectlineDocumentData;
  userTips: UserTipsDocumentData;
};

export type SubCollections = {
  messages: {
    type: MessageSubDocumentData;
    idFlavor: MessageId;
    parent: "conversations";
    parentIdFlavor: ConversationId;
  };
  contents: {
    type: PostSubDocumentData | CommentSubDocumentData | ReplySubDocumentData;
    idFlavor: CommunityContentId;
    parent: "communities";
    parentIdFlavor: CommunityId;
  };
  dialogue: {
    type: DialogueSubDocumentData;
    idFlavor: DialogueId;
    parent: "directlines";
    parentIdFlavor: DirectlineId;
  };
};
