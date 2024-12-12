import { IsEmail, IsNotEmpty, IsString, Length, Matches } from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'example@emai.com', description: 'Enter your email' })
  @Transform(({ value }) => value.trim())
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'Example_password123', description: 'Enter your password' })
  @Transform(({ value }) => value.trim())
  @IsNotEmpty()
  @IsString()
  @Length(8, 30, { message: 'Password must be between 8 and 30 characters' })
  @Matches(new RegExp(/[0-9]/), {
    message: 'Password must contain at least one number',
  })
  @Matches(new RegExp(/[a-z]/), {
    message: 'Password must contain at least one lowercase letter',
  })
  @Matches(new RegExp(/[A-Z]/), {
    message: 'Password must contain at least one uppercase letter',
  })
  @Matches(new RegExp(/[^a-zA-Z0-9]/), {
    message: 'Password must contain at least one special character',
  })
  password: string;

  @ApiProperty({ example: 'Example Name', description: 'Enter your name' })
  @Transform(({ value }) => value.trim())
  @IsNotEmpty()
  @IsString()
  @Length(3, 50, { message: 'Name must be between 3 and 50 characters' })
  name: string;
}
