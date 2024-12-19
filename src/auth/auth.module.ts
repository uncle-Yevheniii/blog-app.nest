import { UtilsService } from 'src/users/utils/utils.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { RtStrategy, AtStrategy } from './strategy';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [AuthController],
  providers: [AuthService, PrismaService, RtStrategy, AtStrategy, UtilsService, JwtService],
})
export class AuthModule {}
