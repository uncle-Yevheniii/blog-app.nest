import { PrismaService } from 'src/prisma/prisma.service';
import { FindPostByIdRes, GetPostsRes } from '../types';
import { Posts, Likes } from '@prisma/client';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UtilsService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(titlePost: string, userId: number): Promise<Posts> {
    return this.prismaService.posts.create({
      data: { userId, titlePost },
    });
  }

  async findPostById(id: number): Promise<FindPostByIdRes> {
    return await this.prismaService.posts.findUnique({
      where: { id },
      include: { likes: true },
    });
  }

  async findLikedPostByUserId(userId: number, postId: number): Promise<Likes> {
    return await this.prismaService.likes.findUnique({
      where: {
        userId_postId: { userId, postId },
      },
    });
  }

  async likePost(postId: number, userId: number): Promise<void> {
    await this.prismaService.likes.create({
      data: { postId, userId },
    });
  }

  async unlikePost(postId: number, userId: number): Promise<void> {
    await this.prismaService.likes.deleteMany({
      where: { postId, userId },
    });
  }

  async getPosts(page: number, limit: number): Promise<GetPostsRes> {
    const totalPosts = await this.prismaService.posts.count();
    const lastPage = Math.ceil(totalPosts / limit);

    const posts = await this.prismaService.posts.findMany({
      skip: (page - 1) * limit,
      take: limit,
      include: { likes: true },
    });

    const transformedPosts = posts.map(post => ({
      ...post,
      likeCount: post.likes.length,
    }));

    return {
      totalPosts,
      currentPage: page,
      lastPage,
      posts: transformedPosts,
    };
  }

  async updatePost(postId: number, titlePost: string): Promise<Posts> {
    return await this.prismaService.posts.update({
      where: { id: postId },
      data: { titlePost },
    });
  }

  async deletePost(postId: number): Promise<void> {
    await this.prismaService.posts.delete({
      where: { id: postId },
    });
  }
}
