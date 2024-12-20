import { PrismaService } from 'src/prisma/prisma.service';
import { PostsController } from './posts.controller';
import { ConfigService } from '@nestjs/config';
import { PostsService } from './posts.service';
import { Module } from '@nestjs/common';
import { UtilsService } from './utils/utils.service';

@Module({
  controllers: [PostsController],
  providers: [PostsService, ConfigService, PrismaService, UtilsService],
})
export class PostsModule {}
