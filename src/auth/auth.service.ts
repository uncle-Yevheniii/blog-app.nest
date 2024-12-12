import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import { Users } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  async signup(createUserDto: CreateUserDto): Promise<Users | null> {
    const user = await this.usersService.findUserByEmail(createUserDto.email);
    if (user) throw new ConflictException('User already exists');

    return await this.usersService.createUser(createUserDto);
  }

  signin() {
    throw new Error('Method not implemented.');
  }
}
