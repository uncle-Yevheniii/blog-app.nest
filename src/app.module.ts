import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { PingModule } from './ping/ping.module';
import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { PostsModule } from './posts/posts.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    PingModule,
    AuthModule,
    PrismaModule,
    PostsModule,
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
