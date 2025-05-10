export interface User {
  _id: string;
  name: string;
  username: string;
  email: string;
  bio: string;
  profileImg: string;
  coverImg: string;
  followers: string[];
  following: string[];
  link: string;
}

export interface Post {
  _id: string;
  user: User;
  text: string;
  image: string;
  likes: string[];
  comments: string[];
}

export enum PostsEnum {
  all = "all",
  following = "following-posts",
  liked = `liked-posts/:userId`,
  userPosts = `user-posts/:userId`,
}

export type SelectedTab = "following-posts" | "all";
