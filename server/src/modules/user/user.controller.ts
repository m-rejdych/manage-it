import {
  Controller,
  Get,
  UseGuards,
  Query,
  NotFoundException,
} from '@nestjs/common';

import UserService from './user.service';
import JwtGuard from '../../guards/jwt.guard';
import User from './user.entity';

@Controller('user')
class UserController {
  constructor(private userService: UserService) {}

  @UseGuards(JwtGuard)
  @Get('get-by-id')
  async getById(@Query('id') id: string): Promise<User> {
    const user = await this.userService.findById(Number(id));

    if (!user) {
      throw new NotFoundException('User not found.');
    }

    return user;
  }

  @UseGuards(JwtGuard)
  @Get('search-users')
  async searchUsers(
    @Query('value') value: string,
    @Query('projectId') projectId: number,
  ): Promise<User[]> {
    return await this.userService.search(value, projectId);
  }
}

export default UserController;
