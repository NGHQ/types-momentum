export type Flavoring<Flavor> = {
  _type?: Flavor;
}

export type Flavor<T, Flavor> = T & Flavoring<Flavor>;

export type UserId = Flavor<string, 'UserId'>;
export type ConversationId = Flavor<string, 'ConversationId'>;
export type MessageId = Flavor<string, 'MessageId'>;
