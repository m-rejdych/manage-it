import { Controller, Post, Body } from '@nestjs/common';

import AuthService from './auth.service';
import RegisterDto from './dto/register.dto';
import User from '../user/user.entity';

@Controller('auth')
class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(@Body() data: RegisterDto): Promise<User> {
    return await this.authService.register(data);
  }
}

export default AuthController;
