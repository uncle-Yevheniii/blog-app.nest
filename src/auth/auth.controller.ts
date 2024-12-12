import { Body, Controller, HttpCode, HttpStatus, Post, Req, UseGuards } from '@nestjs/common';
import { AccessUserDto, CreateUserDto } from './dto';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { Tokens } from './types';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('local/signup')
  @HttpCode(HttpStatus.CREATED)
  async signupLocalUser(@Body() dto: CreateUserDto): Promise<Tokens> {
    return this.authService.signupLocalUser(dto);
  }

  @Post('local/signin')
  @HttpCode(HttpStatus.OK)
  async signinLocalUser(@Body() dto: AccessUserDto): Promise<Tokens> {
    return this.authService.signinLocalUser(dto);
  }

  @UseGuards(AuthGuard('jwt-access'))
  @Post('logout')
  @HttpCode(HttpStatus.OK)
  async logout(@Req() req: Request) {
    const user = req.user;
    return await this.authService.logout(user['sub']);
  }
  @UseGuards(AuthGuard('jwt-refresh'))
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  async refresh(@Req() req: Request) {
    const user = req.user;
    return await this.authService.refresh(user['sub'], user['refreshToken']);
  }
}
