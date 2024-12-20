import { Likes, Posts } from '@prisma/client';

export type FindPostByIdRes = Posts & {
  likes: Array<Likes>;
};
