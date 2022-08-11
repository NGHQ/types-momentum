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
  posts: 'communities', 
} as const;

export const SecondDescendantPaths = {
  comments: 'posts'
} as const;

export const ThirdDescendantPaths = {
  replies: 'comments'
} as const;

