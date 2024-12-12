import { PingController } from './ping.controller';
import { PingService } from './ping.service';
import { Module } from '@nestjs/common';

@Module({
  controllers: [PingController],
  providers: [PingService],
})
export class PingModule {}
