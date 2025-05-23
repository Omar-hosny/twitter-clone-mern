export interface User {
  _id: string;
  name: string;
  username: string;
  email: string;
  bio: string;
  profileImage: string;
  coverImage: string;
  followers: string[];
  following: string[];
  link: string;
  createdAt: string;
}

export interface Post {
  _id: string;
  user: User;
  text: string;
  image: string;
  likes: string[];
  comments: Comment[];
  createdAt: string;
}

// types/notifications for Notification component
export interface NotificationUser {
  _id: string;
  name: string;
  username: string;
  profileImage: string;
}

export interface Notification {
  _id: string;
  from: NotificationUser;
  type: "like" | "follow";
  isRead: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Comment {
  _id: string;
  text: string;
  user: User;
  createdAt: Date;
  updatedAt: Date;
}

export enum PostsEnum {
  all = "all",
  following = "following-posts",
  liked = `liked-posts/:userId`,
  userPosts = `user-posts/:userId`,
}

export interface UserSearch {
  _id: string;
  name: string;
  username: string;
  profileImage: string;
  email: string;
}

export type SelectedTab = "following-posts" | "all";

// types/ contexts for theme provider
export type Theme = "dark" | "light" | "system";

export type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
};

export type ThemeProviderState = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};
