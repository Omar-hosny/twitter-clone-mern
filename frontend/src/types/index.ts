export interface User {
  _id: string;
  username: string;
  email: string;
  bio: string;
  profileImg: string;
  coverImg: string;
  followers: string[];
  following: string[];
  link: string;
}
