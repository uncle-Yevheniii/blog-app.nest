import { Posts, Users } from '@prisma/client';

export type LikeCountRes = {
  likeCount: number;
};

export type User = Pick<Users, 'id' | 'name'>;
export type Post = Omit<Posts, 'userId'>;

export type GetPostsRes = {
  totalPosts: number;
  currentPage: number;
  lastPage: number;
  posts: Array<Post & { user: User } & LikeCountRes>;
};
