import { Controller, Post, Body, Res } from '@nestjs/common';
import { Response } from 'express';

import AuthService from './auth.service';
import RegisterDto from './dto/register.dto';
import AuthResponseDto from './dto/authResponse.dto';

@Controller('auth')
class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(
    @Body() data: RegisterDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<AuthResponseDto> {
    const userData = await this.authService.register(data);

    res.cookie('jwt', userData.token, {
      httpOnly: true,
      maxAge: 36000,
    });

    return userData;
  }
}

export default AuthController;
