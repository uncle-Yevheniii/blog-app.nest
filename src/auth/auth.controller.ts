import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Users } from '@prisma/client';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @ApiResponse({ status: 201, description: 'User successfully signed up' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 409, description: 'Credential already exists' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  @ApiOperation({ summary: 'Sign up user' })
  async signupUser(@Body() createUserDto: CreateUserDto): Promise<Users | null> {
    return await this.authService.signup(createUserDto);
  }

  // @Post('signin')
  // @ApiResponse({ status: 201, description: 'User successfully signed in' })
  // @ApiResponse({ status: 400, description: 'Bad request' })
  // @ApiResponse({ status: 409, description: 'Credential already exists' })
  // @ApiResponse({ status: 500, description: 'Internal server error' })
  // @ApiOperation({ summary: 'Sign in user' })
  // async signinUser() {
  //   return await this.authService.signin();
  // }
}
