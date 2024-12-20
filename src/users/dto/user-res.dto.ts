import { IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class UserResDtoUnauthorized {
  @ApiProperty({
    example: '1',
    description: 'Unique identifier',
  })
  @IsNumber()
  @Expose()
  id: number;

  @ApiProperty({
    example: 'John Doe',
    description: 'User name',
  })
  @IsString()
  @Expose()
  name: string;
}

export class UserResDto extends UserResDtoUnauthorized {
  @ApiProperty({
    example: '2021-01-01T00:00:00Z',
    description: 'Creation date',
  })
  @IsString()
  @Expose()
  createAt: Date;

  @ApiProperty({
    example: '2021-01-01T00:00:00Z',
    description: 'Updated date',
  })
  @IsString()
  @Expose()
  updateAt: Date;
}
