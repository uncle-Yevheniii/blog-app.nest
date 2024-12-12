import { PrismaService } from 'src/prisma/prisma.service';
import { RtStrategy, AtStrategy } from './strategy';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UtilsService } from './utils/utils.service';

@Module({
  imports: [JwtModule.register({})],
  controllers: [AuthController],
  providers: [AuthService, PrismaService, RtStrategy, AtStrategy, UtilsService],
})
export class AuthModule {}
