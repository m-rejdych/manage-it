import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import AuthService from './auth.service';
import LocalStrategy from './strategies/local.strategy';
import AuthController from './auth.controller';
import UserModule from '../user';
import User from '../user/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User]), UserModule],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy],
})
class AuthModule {}

export default AuthModule;
