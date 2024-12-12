import { PrismaService } from './prisma/prisma.service';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import { AppService } from './app.service';
import { Module } from '@nestjs/common';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true })],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
