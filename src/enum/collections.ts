export const CollectionRootPaths = {
  users: 'root', 
  communities: 'root',
  conversations: 'root', 
  roles: 'root',
  tips: 'root', 
  polls: 'root'
} as const;

export const FirstDescendantPaths = {
  messages: 'conversations', 
  contents: 'communities', 
} as const;

