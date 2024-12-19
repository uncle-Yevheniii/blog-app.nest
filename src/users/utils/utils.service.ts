import { PrismaService } from 'src/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { Users } from '@prisma/client';

@Injectable()
export class UtilsService {
  constructor(private readonly prismaService: PrismaService) {}

  async getUserById(id: number): Promise<Users> {
    return await this.prismaService.users.findUnique({ where: { id } });
  }

  async getUserByName(name: string): Promise<Users> {
    return await this.prismaService.users.findUnique({ where: { name } });
  }
}
