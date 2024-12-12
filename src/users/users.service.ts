import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { PassService } from './pass/pass.service';
import { Injectable } from '@nestjs/common';
import { Users } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly passService: PassService,
  ) {}

  async findUserByEmail(email: string): Promise<Users | null> {
    return await this.prisma.users.findUnique({ where: { email } });
  }

  async createUser(createUserDto: CreateUserDto): Promise<Users | null> {
    const { password, ...userData } = createUserDto;
    const hash = await this.passService.hashPassword(password);

    return await this.prisma.users.create({
      data: { hash, ...userData },
    });
  }
}
