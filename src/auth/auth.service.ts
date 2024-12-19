import {
  BadRequestException,
  ForbiddenException,
  NotFoundException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { UtilsService } from 'src/users/utils/utils.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { AccessUserDto, CreateUserDto } from './dto';

import { Tokens } from './types';

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly utilsService: UtilsService,
  ) {}

  async signupLocalUser(dto: CreateUserDto): Promise<Tokens> {
    const userExistsByEmail = await this.utilsService.findUserByEmail(dto.email);
    const userExistsByName = await this.utilsService.findUserByName(dto.name);
    if (userExistsByEmail || userExistsByName)
      throw new ConflictException('Credential already exists');

    const { password, ...userInfo } = dto;
    const hashPwd = await this.utilsService.hashData(password);

    const user = await this.prismaService.users.create({
      data: { hashPwd, ...userInfo },
    });

    const tokens = await this.utilsService.signToken(user.id, user.email);
    await this.utilsService.updateRtHash(user.id, tokens.refreshToken);

    return tokens;
  }

  async signinLocalUser(dto: AccessUserDto): Promise<Tokens> {
    const user = await this.utilsService.findUserByEmail(dto.email);
    if (!user) throw new NotFoundException('Credentials are invalid');

    const isMatch = await this.utilsService.matchData(user.hashPwd, dto.password);
    if (!isMatch) throw new BadRequestException('Credentials are invalid');

    const tokens = await this.utilsService.signToken(user.id, user.email);
    await this.utilsService.updateRtHash(user.id, tokens.refreshToken);

    return tokens;
  }

  async logout(userID: number): Promise<void> {
    await this.utilsService.findUserByIdAndUpdateRt(userID);
  }

  async refresh(userID: number, rt: string): Promise<Tokens> {
    const user = await this.utilsService.findUserById(userID);
    if (!user) throw new ForbiddenException('Access denied');

    const isMatch = await this.utilsService.matchData(user.hashRt, rt);
    if (!isMatch) throw new ForbiddenException('Access denied');

    const tokens = await this.utilsService.signToken(user.id, user.email);
    await this.utilsService.updateRtHash(user.id, tokens.refreshToken);

    return tokens;
  }
}
