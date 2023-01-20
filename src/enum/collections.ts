export const CollectionRootPaths = {
  users: 'root', 
  communities: 'root',
  conversations: 'root', 
  roles: 'root',
  playlists: 'root',
  genres: 'root',
  tips: 'root', 
  polls: 'root', 
  directlines: 'root',
  notifications: 'root' 
} as const;

export const FirstDescendantPaths = {
  tips: 'playlists',
  messages: 'conversations', 
  dialogue: 'directlines',
  contents: 'communities', 
  userNotifications: 'notifications'
} as const;

