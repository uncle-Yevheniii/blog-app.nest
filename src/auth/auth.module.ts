import { PrismaService } from 'src/prisma/prisma.service';
import { PassService } from 'src/users/pass/pass.service';
import { UsersService } from 'src/users/users.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { Module } from '@nestjs/common';

@Module({
  controllers: [AuthController],
  providers: [AuthService, UsersService, PrismaService, PassService],
})
export class AuthModule {}
