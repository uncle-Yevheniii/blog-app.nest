import { IsString, MaxLength, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class BodyPostDto {
  @ApiProperty({ description: 'Post title' })
  @IsString()
  @MinLength(6)
  @MaxLength(512)
  titlePost: string;
}
