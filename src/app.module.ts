import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { PingModule } from './ping/ping.module';
import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    PingModule,
    AuthModule,
    PrismaModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
