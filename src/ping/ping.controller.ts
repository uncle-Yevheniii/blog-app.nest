import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Controller, Get } from '@nestjs/common';
import { PingService } from './ping.service';

@Controller('ping')
export class PingController {
  constructor(private readonly pingService: PingService) {}

  @ApiResponse({ status: 200, description: 'Returns pong' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  @ApiOperation({ summary: 'Health server check' })
  @Get()
  getPingPong() {
    return this.pingService.getPingPong();
  }
}
