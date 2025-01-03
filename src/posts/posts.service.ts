import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { UtilsService } from './utils/utils.service';
import { GetPostsRes, LikeCountRes } from './types';
import { BodyPostDto, QueryPostDto } from './dto';
import { Posts } from '@prisma/client';

@Injectable()
export class PostsService {
  constructor(private readonly utilsService: UtilsService) {}

  async createPost(dto: BodyPostDto, userId: number): Promise<Posts> {
    return await this.utilsService.create(dto.titlePost, userId);
  }

  async addLikeToPost(postId: number, userId: number): Promise<LikeCountRes> {
    const post = await this.utilsService.findPostById(postId);
    if (!post) throw new NotFoundException('Post not found');

    const likeExists = await this.utilsService.findLikedPostByUserId(userId, postId);
    if (likeExists) throw new ConflictException('Post already liked');

    await this.utilsService.likePost(postId, userId);
    const likeCount = post.likes.length + 1;

    return { likeCount };
  }

  async removeLikeToPost(postId: number, userId: number): Promise<LikeCountRes> {
    const post = await this.utilsService.findPostById(postId);
    if (!post) throw new NotFoundException('Post not found');

    const likeExists = await this.utilsService.findLikedPostByUserId(userId, postId);
    if (!likeExists) throw new ConflictException('Post already unlike');

    await this.utilsService.unlikePost(postId, userId);
    const likeCount = post.likes.length - 1;

    return { likeCount };
  }

  async getPostById(postId: number): Promise<Posts & LikeCountRes> {
    const post = await this.utilsService.findPostById(postId);
    if (!post) throw new NotFoundException('Post not found');

    const likeCount = post.likes.length;

    return { ...post, likeCount };
  }

  async getPosts(dto: QueryPostDto): Promise<GetPostsRes> {
    if (!dto.page) dto.page = 1;
    if (!dto.limit) dto.limit = 10;

    return await this.utilsService.getPosts(dto.page, dto.limit);
  }

  async updatePost(postId: number, body: BodyPostDto, userId: number): Promise<Posts> {
    const post = await this.utilsService.findPostById(postId);
    if (!post) throw new NotFoundException('Post not found');
    if (post.userId !== userId) throw new ConflictException('You are not the owner of the post');

    return await this.utilsService.updatePost(postId, body.titlePost);
  }

  async deletePost(postId: number, userId: number): Promise<void> {
    const post = await this.utilsService.findPostById(postId);
    if (!post) throw new NotFoundException('Post not found');
    if (post.userId !== userId) throw new ConflictException('You are not the owner of the post');

    await this.utilsService.deletePost(postId);
  }
}
