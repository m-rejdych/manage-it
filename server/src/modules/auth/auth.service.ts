import { Injectable } from '@nestjs/common';

@Injectable()
class AuthService {
  async register() {
    return 'register';
  }
}

export default AuthService;
