import { Type } from 'class-transformer';
import { IsInt } from 'class-validator';

export class ParamPostDto {
  @Type(() => Number)
  @IsInt()
  postId: number;
}
