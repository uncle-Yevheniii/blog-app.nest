import { IsInt } from 'class-validator';

export class LikeCountResDto {
  @IsInt()
  likeCount: number;
}
