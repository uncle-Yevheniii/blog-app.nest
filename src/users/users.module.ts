import { PrismaService } from 'src/prisma/prisma.service';
import { UtilsService } from './utils/utils.service';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [JwtModule.register({})],
  controllers: [UsersController],
  providers: [UsersService, UtilsService, PrismaService],
})
export class UsersModule {}
