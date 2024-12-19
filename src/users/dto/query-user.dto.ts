import { IsInt, IsString, IsPositive, IsOptional, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class QueryUserDto {
  @ApiProperty({ description: 'Unique user - id' })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @IsPositive()
  id?: number;

  @ApiProperty({ description: 'Unique user - name' })
  @IsOptional()
  @IsString()
  @Length(3, 50, { message: 'Name must be between 3 and 50 characters' })
  name?: string;
}
