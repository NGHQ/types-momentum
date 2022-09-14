export const CollectionRootPaths = {
  users: 'root', 
  communities: 'root',
  conversations: 'root', 
  roles: 'root',
  genres: 'root',
  tips: 'root', 
  polls: 'root', 
  directlines: 'root' 
} as const;

export const FirstDescendantPaths = {
  messages: 'conversations', 
  dialogue: 'directlines',
  contents: 'communities', 
} as const;

