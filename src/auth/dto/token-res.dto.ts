import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsString } from 'class-validator';

export class TokenResDto {
  @ApiProperty({
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwiaWF0IjoxNjA5MjI2MjIyfQ.4JQ1',
    description: 'Access token',
  })
  @IsString()
  @Expose()
  accessToken: string;

  @ApiProperty({
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwiaWF0IjoxNjA5MjI2MjIyfQ.4JQ1',
    description: 'Refresh token',
  })
  @IsString()
  @Expose()
  refreshToken: string;
}
