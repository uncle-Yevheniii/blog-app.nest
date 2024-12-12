import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AccessUserDto, CreateUserDto } from './dto';
import { Tokens } from './types';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('local/signup')
  async signupLocalUser(@Body() dto: CreateUserDto): Promise<Tokens> {
    return this.authService.signupLocalUser(dto);
  }

  @Post('local/signin')
  async signinLocalUser(@Body() dto: AccessUserDto): Promise<Tokens> {
    return this.authService.signinLocalUser(dto);
  }

  @Post('/logout')
  async logout() {}

  @Post('/refresh')
  async refresh() {}
}
