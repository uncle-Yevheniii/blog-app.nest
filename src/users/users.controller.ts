import {
  BadRequestException,
  HttpStatus,
  Controller,
  UseGuards,
  HttpCode,
  Query,
  Get,
  Req,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiQuery, ApiResponse, getSchemaPath } from '@nestjs/swagger';
import { UserResDto, QueryUserDto, UserResDtoUnauthorized } from './dto';
import { UsersService } from './users.service';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Return user',
    schema: { type: 'object', $ref: getSchemaPath(UserResDtoUnauthorized) },
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad request' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Not found user' })
  @ApiOperation({ summary: 'Find user by id or name' })
  @ApiQuery({ name: 'id', required: false, type: Number })
  @ApiQuery({ name: 'name', required: false, type: String })
  @Get('get-user')
  @HttpCode(HttpStatus.OK)
  async findUserByIdOrUsername(@Query() dto: QueryUserDto): Promise<UserResDtoUnauthorized> {
    if (!dto.id && !dto.name)
      throw new BadRequestException('You must provide either id or username');

    return await this.usersService.findUserByIdOrUsername(dto);
  }

  @ApiBearerAuth('JWT-Token')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Return user',
    schema: { type: 'object', $ref: getSchemaPath(UserResDto) },
  })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
  @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, description: 'Internal server error' })
  @ApiOperation({ summary: 'Get me' })
  @UseGuards(AuthGuard('jwt-access'))
  @Get('get-me')
  @HttpCode(HttpStatus.OK)
  async getMe(@Req() req: Request): Promise<UserResDto> {
    const user = req.user;
    return await this.usersService.getMe(user['sub']);
  }
}
