import {
  Controller,
  Post,
  Body,
  Res,
  UseGuards,
  Req,
  ConsoleLogger,
} from '@nestjs/common';
import { Response, Request } from 'express';

import AuthService from './auth.service';
import RegisterDto from './dto/register.dto';
import User from '../user/user.entity';
import LocalGuard from '../../guards/local.guard';
import AuthRequest from './interfaces/auth-request';

@Controller('auth')
class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(
    @Body() data: RegisterDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<User> {
    const { user, token } = await this.authService.register(data);

    res.cookie('jwt', token, {
      httpOnly: true,
      maxAge: 3600000,
      secure: process.env.NODE_ENV === 'production',
    });

    return user;
  }

  @UseGuards(LocalGuard)
  @Post('login')
  async login(
    @Req() req: AuthRequest,
    @Res({ passthrough: true }) res: Response,
  ): Promise<User> {
    const { user, token } = await this.authService.login(req.user.id);

    res.cookie('jwt', token, {
      httpOnly: true,
      maxAge: 3600000,
      secure: process.env.NODE_ENV === 'production',
    });

    return user;
  }

  @Post('autologin')
  async autologin(@Req() req: Request): Promise<User | null> {
    return await this.authService.autologin(req);
  }
}

export default AuthController;
