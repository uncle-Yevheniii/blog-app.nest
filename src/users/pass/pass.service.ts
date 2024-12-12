import { Injectable } from '@nestjs/common';
import { hash } from 'argon2';

@Injectable()
export class PassService {
  constructor() {}

  async hashPassword(password: string): Promise<string> {
    return await hash(password);
  }

  comparePassword() {
    throw new Error('Method not implemented.');
  }
}
