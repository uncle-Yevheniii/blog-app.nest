import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AccessUserDto, CreateUserDto } from './dto';
import { UtilsService } from './utils/utils.service';
import { Tokens } from './types';

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly utilsService: UtilsService,
  ) {}

  async updateRtHash(userID: number, rt: string): Promise<void> {
    const hashRt = await this.utilsService.hashData(rt);
    await this.utilsService.findUserByIdAndUpdateRt(userID, hashRt);
  }

  async signupLocalUser(dto: CreateUserDto): Promise<Tokens> {
    const userExists = await this.utilsService.findUserByEmail(dto.email);
    if (userExists) throw new ConflictException('Credential already exists');

    const { password, ...userInfo } = dto;
    const hashPwd = await this.utilsService.hashData(password);

    const user = await this.prismaService.users.create({
      data: { hashPwd, ...userInfo },
    });

    const tokens = await this.utilsService.signToken(user.id, user.email);
    await this.updateRtHash(user.id, tokens.refreshToken);

    return tokens;
  }

  async signinLocalUser(dto: AccessUserDto): Promise<Tokens> {
    const user = await this.utilsService.findUserByEmail(dto.email);
    if (!user) throw new BadRequestException('Credentials are invalid');

    const isMatch = await this.utilsService.matchData(user.hashPwd, dto.password);
    if (!isMatch) throw new BadRequestException('Credentials are invalid');

    const tokens = await this.utilsService.signToken(user.id, user.email);
    await this.updateRtHash(user.id, tokens.refreshToken);

    return tokens;
  }
  async logout(userID: number): Promise<void> {
    await this.utilsService.findUserByIdAndUpdateRt(userID);
  }
  async refresh(userID: number, rt: string): Promise<Tokens> {
    const user = await this.utilsService.findUserById(userID);
    if (!user) throw new BadRequestException('Access denied');

    const isMatch = await this.utilsService.matchData(user.hashRt, rt);
    if (!isMatch) throw new BadRequestException('Access denied');

    const tokens = await this.utilsService.signToken(user.id, user.email);
    await this.updateRtHash(user.id, tokens.refreshToken);

    return tokens;
  }
}
