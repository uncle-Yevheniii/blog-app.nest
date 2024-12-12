import { PrismaService } from 'src/prisma/prisma.service';
import { RtStrategy, AtStrategy } from './strategy';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [JwtModule.register({})],
  controllers: [AuthController],
  providers: [AuthService, PrismaService, RtStrategy, AtStrategy],
})
export class AuthModule {}
