import { Posts } from '@prisma/client';

export type LikeCountRes = {
  likeCount: number;
};

export type GetPostsRes = {
  totalPosts: number;
  currentPage: number;
  lastPage: number;
  posts: Array<Posts & LikeCountRes>;
};
