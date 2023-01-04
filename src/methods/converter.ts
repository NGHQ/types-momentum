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
  NotificationDocumentData,
  NotificationId,
  UserNotificationDocumentData,
  UserId,
} from "../types";

// TODO Needs updating with current models
export type RootCollections = {
  users: UserDocumentData;
  notifications: NotificationDocumentData;
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
  notification: {
    type: UserNotificationDocumentData;
    idFlavor: NotificationId;
    parent: "notifications";
    parentIdFlavour: UserId;
  }
};
