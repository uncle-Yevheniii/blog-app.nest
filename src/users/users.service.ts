import { QueryUserDto, UserResDtoUnauthorized } from './dto/index';
import { Injectable, NotFoundException } from '@nestjs/common';
import { UtilsService } from './utils/utils.service';

@Injectable()
export class UsersService {
  constructor(private readonly utilsService: UtilsService) {}

  async findUserByIdOrUsername(dto: QueryUserDto): Promise<UserResDtoUnauthorized> {
    const user = dto.id
      ? await this.utilsService.getUserById(dto.id)
      : await this.utilsService.getUserByName(dto.name);

    if (!user) throw new NotFoundException('User not found');

    return { id: user.id, name: user.name };
  }

  async getMe(id: number) {
    const user = await this.utilsService.getUserById(id);

    return { id: user.id, name: user.name, createAt: user.createdAt, updateAt: user.updatedAt };
  }
}
