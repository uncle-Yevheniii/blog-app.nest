import { Injectable } from '@nestjs/common';

@Injectable()
export class PingService {
  getPingPong() {
    return { ping: 'pong' };
  }
}
