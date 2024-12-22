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
import {
  BodyPostDto,
  CreatePostResDto,
  GetPostResDto,
  GetPostsResDto,
  LikeResDto,
  ParamPostDto,
  QueryPostDto,
} from './dto';
import { GetPostsRes, LikeCountRes } from './types';
import { PostsService } from './posts.service';
import { AuthGuard } from '@nestjs/passport';
import { Posts } from '@prisma/client';
import { Request } from 'express';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  getSchemaPath,
} from '@nestjs/swagger';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @ApiBearerAuth('JWT-Token')
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Post created',
    schema: { type: 'object', $ref: getSchemaPath(CreatePostResDto) },
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad request' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
  @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, description: 'Internal server error' })
  @ApiOperation({ summary: 'Create post' })
  @UseGuards(AuthGuard('jwt-access'))
  @Post('create')
  @HttpCode(HttpStatus.CREATED)
  async createPost(@Body() dto: BodyPostDto, @Req() req: Request): Promise<Posts> {
    const userId: number = req.user['sub'];
    return await this.postsService.createPost(dto, userId);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Posts found',
    schema: { type: 'object', $ref: getSchemaPath(GetPostsResDto) },
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad request' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
  @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, description: 'Internal server error' })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiOperation({ summary: 'Get posts' })
  @Get('get')
  @HttpCode(HttpStatus.OK)
  async getPosts(@Query() dto: QueryPostDto): Promise<GetPostsRes> {
    return await this.postsService.getPosts(dto);
  }

  @ApiBearerAuth('JWT-Token')
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Like added',
    schema: { type: 'object', $ref: getSchemaPath(LikeResDto) },
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad request' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
  @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, description: 'Internal server error' })
  @ApiParam({ name: 'postId', required: true, type: Number })
  @ApiOperation({ summary: 'Add like' })
  @UseGuards(AuthGuard('jwt-access'))
  @Post(':postId/like')
  @HttpCode(HttpStatus.CREATED)
  async addLike(@Param() dto: ParamPostDto, @Req() req: Request): Promise<LikeCountRes> {
    const userId: number = req.user['sub'];
    return await this.postsService.addLikeToPost(dto.postId, userId);
  }

  @ApiBearerAuth('JWT-Token')
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Like removed',
    schema: { type: 'object', $ref: getSchemaPath(LikeResDto) },
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad request' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
  @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, description: 'Internal server error' })
  @ApiParam({ name: 'postId', required: true, type: Number })
  @ApiOperation({ summary: 'Remove like' })
  @UseGuards(AuthGuard('jwt-access'))
  @Delete(':postId/unlike')
  @HttpCode(HttpStatus.OK)
  async removeLike(@Param() dto: ParamPostDto, @Req() req: Request): Promise<LikeCountRes> {
    const userId: number = req.user['sub'];
    return await this.postsService.removeLikeToPost(dto.postId, userId);
  }

  @ApiBearerAuth('JWT-Token')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Post found',
    schema: { type: 'object', $ref: getSchemaPath(GetPostResDto) },
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad request' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
  @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, description: 'Internal server error' })
  @ApiParam({ name: 'postId', required: true, type: Number })
  @ApiOperation({ summary: 'Get post' })
  @UseGuards(AuthGuard('jwt-access'))
  @Get(':postId/get')
  @HttpCode(HttpStatus.OK)
  async getPost(@Param() dto: ParamPostDto): Promise<Posts & LikeCountRes> {
    return await this.postsService.getPostById(dto.postId);
  }

  @ApiBearerAuth('JWT-Token')
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Post created',
    schema: { type: 'object', $ref: getSchemaPath(CreatePostResDto) },
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad request' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
  @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, description: 'Internal server error' })
  @ApiParam({ name: 'postId', required: true, type: Number })
  @ApiOperation({ summary: 'Post updated' })
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

  @ApiBearerAuth('JWT-Token')
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Post deleted',
    schema: { type: 'object' },
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad request' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
  @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, description: 'Internal server error' })
  @ApiParam({ name: 'postId', required: true, type: Number })
  @ApiOperation({ summary: 'Post deleted' })
  @UseGuards(AuthGuard('jwt-access'))
  @Delete(':postId/delete')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deletePost(@Param() dto: ParamPostDto, @Req() req: Request): Promise<void> {
    const userId: number = req.user['sub'];
    await this.postsService.deletePost(dto.postId, userId);
  }
}
