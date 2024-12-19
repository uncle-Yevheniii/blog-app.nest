import { QueryUserDto, UserResDto, UserResDtoUnauthorized } from './dto/index';
import { Injectable, NotFoundException } from '@nestjs/common';
import { UtilsService } from './utils/utils.service';
import { Users } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private readonly utilsService: UtilsService) {}

  async findUserByIdOrUsername(dto: QueryUserDto): Promise<UserResDtoUnauthorized> {
    let user: Users;

    if (dto.id) user = await this.utilsService.findUserById(dto.id);
    if (dto.name) user = await this.utilsService.findUserByName(dto.name);
    if (!user) throw new NotFoundException('User not found');

    return { id: user.id, name: user.name };
  }

  async getMe(id: number): Promise<UserResDto> {
    const user = await this.utilsService.findUserById(id);

    return { id: user.id, name: user.name, createAt: user.createdAt, updateAt: user.updatedAt };
  }
}
