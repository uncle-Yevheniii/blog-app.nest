import {
  HttpStatus,
  Controller,
  UseGuards,
  HttpCode,
  Delete,
  Param,
  Query,
  Body,
  Post,
  Get,
  Req,
  Put,
} from '@nestjs/common';
import { BodyPostDto, ParamPostDto, QueryPostDto } from './dto';
import { GetPostsRes, LikeCountRes } from './types';
import { PostsService } from './posts.service';
import { AuthGuard } from '@nestjs/passport';
import { Posts } from '@prisma/client';
import { Request } from 'express';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @UseGuards(AuthGuard('jwt-access'))
  @Post('create')
  @HttpCode(HttpStatus.CREATED)
  async createPost(@Body() dto: BodyPostDto, @Req() req: Request): Promise<Posts> {
    const userId: number = req.user['sub'];
    return await this.postsService.createPost(dto, userId);
  }

  @UseGuards(AuthGuard('jwt-access'))
  @Get('get')
  @HttpCode(HttpStatus.OK)
  async getPosts(@Query() dto: QueryPostDto): Promise<GetPostsRes> {
    return await this.postsService.getPosts(dto);
  }

  @UseGuards(AuthGuard('jwt-access'))
  @Post(':postId/like')
  @HttpCode(HttpStatus.OK)
  async addLike(@Param() dto: ParamPostDto, @Req() req: Request): Promise<LikeCountRes> {
    const userId: number = req.user['sub'];
    return await this.postsService.addLikeToPost(dto.postId, userId);
  }

  @UseGuards(AuthGuard('jwt-access'))
  @Delete(':postId/unlike')
  @HttpCode(HttpStatus.OK)
  async removeLike(@Param() dto: ParamPostDto, @Req() req: Request): Promise<LikeCountRes> {
    const userId: number = req.user['sub'];
    return await this.postsService.removeLikeToPost(dto.postId, userId);
  }

  @UseGuards(AuthGuard('jwt-access'))
  @Get(':postId/get')
  @HttpCode(HttpStatus.OK)
  async getPost(@Param() dto: ParamPostDto): Promise<Posts & LikeCountRes> {
    return await this.postsService.getPostById(dto.postId);
  }

  @UseGuards(AuthGuard('jwt-access'))
  @Put(':postId/update')
  @HttpCode(HttpStatus.CREATED)
  async updatePost(
    @Param() param: ParamPostDto,
    @Body() body: BodyPostDto,
    @Req() req: Request,
  ): Promise<Posts> {
    const userId: number = req.user['sub'];
    return await this.postsService.updatePost(param.postId, body, userId);
  }

  @UseGuards(AuthGuard('jwt-access'))
  @Delete(':postId/delete')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deletePost(@Param() dto: ParamPostDto, @Req() req: Request): Promise<void> {
    const userId: number = req.user['sub'];
    await this.postsService.deletePost(dto.postId, userId);
  }
}
