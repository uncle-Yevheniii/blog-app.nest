import { PrismaService } from 'src/prisma/prisma.service';
import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Tokens } from 'src/auth/types';
import { Users } from '@prisma/client';
import { hash, verify } from 'argon2';

@Injectable()
export class UtilsService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  async findUserByName(name: string): Promise<Users> {
    return this.prismaService.users.findUnique({ where: { name } });
  }

  async findUserByEmail(email: string): Promise<Users> {
    return this.prismaService.users.findUnique({ where: { email } });
  }

  async findUserById(id: number): Promise<Users> {
    return this.prismaService.users.findUnique({ where: { id } });
  }

  async findUserByIdAndUpdateRt(id: number, rt: string | null = null): Promise<Users> {
    return this.prismaService.users.update({
      where: { id, hashRt: rt === null ? { not: null } : undefined },
      data: { hashRt: rt },
    });
  }

  async hashData(data: string): Promise<string> {
    return await hash(data);
  }

  async matchData(hash: string, data: string): Promise<boolean> {
    return await verify(hash, data);
  }

  async signToken(userID: number, email: string): Promise<Tokens> {
    const [at, rt] = await Promise.all([
      this.jwtService.signAsync(
        { sub: userID, email },
        {
          expiresIn: this.configService.get<string>('AT_EXPIRES_IN') || 1,
          secret: this.configService.get<string>('AT_SECRET') || 'secret',
        },
      ),
      this.jwtService.signAsync(
        { sub: userID, email },
        {
          expiresIn: this.configService.get<string>('RT_EXPIRES_IN') || 1,
          secret: this.configService.get<string>('RT_SECRET') || 'secret',
        },
      ),
    ]);

    return { accessToken: at, refreshToken: rt };
  }

  async updateRtHash(userID: number, rt: string): Promise<void> {
    const hashRt = await this.hashData(rt);
    await this.findUserByIdAndUpdateRt(userID, hashRt);
  }
}
