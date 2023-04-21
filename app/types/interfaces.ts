export interface User {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  image: string;
  accounts: any;
  posts?: Post[];
  comments?: Comment[];
}

export interface Post {
  id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  published: boolean;
  userId: string;
  user: User;
  comments?: Comment[];
}

export interface Comment {
  id: string;
  message: string;
  createdAt: string;
  updatedAt: string;
  published: boolean;
  userId: string;
  user: User;
  postId: string;
  post: Post;
}
