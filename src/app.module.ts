import { PrismaService } from './prisma/prisma.service';
import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { PingModule } from './ping/ping.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), PingModule],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
