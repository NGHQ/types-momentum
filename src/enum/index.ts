export * from './auth';
export * from './community';
export * from './content';
export * from './conversation';
export * from './user';

export const CollectionRootPaths = {
  communities: 'root',
  conversations: 'root', 
  roles: 'root',
  users: 'root', 
} as const;

export const FirstDescendantPaths = {
  messages: 'conversations', 
  contents: 'communities', 
} as const;

