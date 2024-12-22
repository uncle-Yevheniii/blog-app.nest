import { IsArray, IsInt, IsString } from 'class-validator';
import { BodyPostDto } from './body-post.dto';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class CreatePostResDto extends BodyPostDto {
  @ApiProperty({ example: 1, description: 'Post id' })
  @IsInt()
  @Expose()
  id: number;

  @ApiProperty({ example: '2024-12-22T15:01:30.698Z', description: 'Post updated date' })
  @IsString()
  @Expose()
  updatedAt: string;

  @ApiProperty({ example: '2024-12-22T15:01:30.698Z', description: 'Post created date' })
  @IsString()
  @Expose()
  createdAt: string;

  @ApiProperty({ example: 1, description: 'User id' })
  @IsInt()
  @Expose()
  userId: number;
}

export class LikeDto {
  @ApiProperty({ example: 1, description: 'Like id' })
  @IsInt()
  @Expose()
  id: number;

  @ApiProperty({ example: '2024-12-22T15:01:30.698Z', description: 'Like created date' })
  @IsString()
  @Expose()
  createdAt: string;

  @ApiProperty({ example: 1, description: 'User id' })
  @IsInt()
  @Expose()
  userId: number;

  @ApiProperty({ example: 1, description: 'Post id' })
  @IsInt()
  @Expose()
  postId: number;
}

export class LikeResDto {
  @ApiProperty({ example: 1, description: 'Like count' })
  @IsInt()
  @Expose()
  likeCount: number;
}

export class GetPostResDto extends CreatePostResDto {
  @ApiProperty({ example: 1, description: 'Like count' })
  @IsInt()
  @Expose()
  likeCount: number;

  @ApiProperty({ type: [LikeDto], description: 'Likes' })
  @IsArray()
  @Expose()
  likes: LikeDto[];
}

export class GetPostsResDto extends GetPostResDto {
  @ApiProperty({ example: 1, description: 'Total posts' })
  @IsInt()
  @Expose()
  totalPosts: number;

  @ApiProperty({ example: 1, description: 'Current page' })
  @IsInt()
  @Expose()
  currentPage: number;

  @ApiProperty({ example: 1, description: 'Last page' })
  @IsInt()
  @Expose()
  lastPage: number;
}
