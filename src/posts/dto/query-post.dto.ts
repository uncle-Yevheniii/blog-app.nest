import { IsInt, IsOptional, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class QueryPostDto {
  @Type(() => Number)
  @IsOptional()
  @IsInt()
  @Min(1)
  page?: number;

  @Type(() => Number)
  @IsOptional()
  @IsInt()
  @Min(1)
  limit?: number;
}
