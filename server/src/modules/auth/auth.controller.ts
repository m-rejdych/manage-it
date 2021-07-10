import { Controller, Get } from '@nestjs/common';

import AuthService from './auth.service';

@Controller('auth')
class AuthController {
  constructor(private authService: AuthService) {}

  @Get('register')
  async register() {
    return this.authService.register();
  }
}

export default AuthController;
