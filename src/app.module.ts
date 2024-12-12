import { PrismaService } from './prisma/prisma.service';
import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { PingModule } from './ping/ping.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), PingModule, AuthModule, UsersModule],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
