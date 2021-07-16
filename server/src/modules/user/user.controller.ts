import { Controller, Get, UseGuards, Query } from '@nestjs/common';

import UserService from './user.service';
import JwtGuard from '../../guards/jwt.guard';
import User from './user.entity';

@Controller('user')
class UserController {
  constructor(private userService: UserService) {}

  @UseGuards(JwtGuard)
  @Get('get-by-id')
  async getById(@Query('id') id: string): Promise<User> {
    return await this.userService.findById(Number(id));
  }
}

export default UserController;
