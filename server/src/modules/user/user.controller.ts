import {
  Controller,
  Get,
  UseGuards,
  Query,
  NotFoundException,
  Req,
} from '@nestjs/common';

import UserService from './user.service';
import JwtGuard from '../../guards/jwt.guard';
import { JwtAuthRequest } from '../auth/interfaces/authRequest';
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
    @Req() req: JwtAuthRequest,
    @Query('value') value: string,
    @Query('projectId') projectId?: string,
  ): Promise<User[]> {
    const { userId } = req.user;

    return await this.userService.search(userId, value, Number(projectId));
  }
}

export default UserController;
