import { Body, Controller, HttpCode, HttpStatus, Post, Req, UseGuards } from '@nestjs/common';
import { AccessUserDto, CreateUserDto } from './dto';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { Tokens } from './types';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiResponse({ status: HttpStatus.CREATED, description: 'User created' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad request' })
  @ApiResponse({ status: HttpStatus.CONFLICT, description: 'User already exists' })
  @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, description: 'Internal server error' })
  @ApiOperation({ summary: 'Sign up local user' })
  @Post('local/signup')
  @HttpCode(HttpStatus.CREATED)
  async signupLocalUser(@Body() dto: CreateUserDto): Promise<Tokens> {
    return this.authService.signupLocalUser(dto);
  }

  @ApiResponse({ status: HttpStatus.CREATED, description: 'User accessed' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad request' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'User not found' })
  @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, description: 'Internal server error' })
  @ApiOperation({ summary: 'Sign in local user' })
  @Post('local/signin')
  @HttpCode(HttpStatus.OK)
  async signinLocalUser(@Body() dto: AccessUserDto): Promise<Tokens> {
    return this.authService.signinLocalUser(dto);
  }

  @ApiBearerAuth('at')
  @ApiResponse({ status: HttpStatus.NO_CONTENT, description: 'User logged out' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
  @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, description: 'Internal server error' })
  @ApiOperation({ summary: 'Logout user' })
  @UseGuards(AuthGuard('jwt-access'))
  @Post('logout')
  @HttpCode(HttpStatus.NO_CONTENT)
  async logout(@Req() req: Request) {
    const user = req.user;
    return await this.authService.logout(user['sub']);
  }

  @ApiBearerAuth('at')
  @ApiResponse({ status: HttpStatus.OK, description: 'Token refreshed' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Access denied' })
  @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, description: 'Internal server error' })
  @ApiOperation({ summary: 'Refresh token' })
  @UseGuards(AuthGuard('jwt-refresh'))
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  async refresh(@Req() req: Request) {
    const user = req.user;
    return await this.authService.refresh(user['sub'], user['refreshToken']);
  }
}
