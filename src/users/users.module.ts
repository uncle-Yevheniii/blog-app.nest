import { PrismaService } from 'src/prisma/prisma.service';
import { UsersService } from './users.service';
import { Module } from '@nestjs/common';
import { PassService } from './pass/pass.service';

@Module({
  controllers: [],
  providers: [UsersService, PrismaService, PassService],
})
export class UsersModule {}
