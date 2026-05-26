export interface Cat {
  id: string;
  url: string;
}

export interface Comment {
  id: string;
  username: string;
  text: string;
}

export interface Post {
  id: string;
  imageUrl: string;
  avatarUrl: string;
  username: string;
  caption: string;
  likes: number;
  date: string;
  comments: Comment[];
}

export interface User {
  username: string;
  fullName: string;
  bio: string;
  avatar: string;
  posts: number;
  followers: number;
  following: number;
}