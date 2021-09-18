import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { Request } from 'express';

import UserService from '../user/user.service';
import User from '../user/user.entity';
import RegisterDto from './dto/register.dto';
import AuthPayload from './dto/authPayload.dto';
import JwtPayload from './dto/jwtPayload.dto';
import extractJwtFromCookie from './util/extractJwtFromCookie';

@Injectable()
class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(
    email: string,
    password: string,
  ): Promise<Omit<User, 'password'> | null> {
    const user = await this.userService.findByEmail(email, {
      withPassword: true,
    });
    if (!user) return null;

    const { password: userPassword, ...rest } = user;
    const isValid = await compare(password, userPassword);
    if (!isValid) return null;

    return rest;
  }

  async register({
    email,
    username,
    password,
    repeatPassword,
  }: RegisterDto): Promise<AuthPayload> {
    if (password !== repeatPassword) {
      throw new BadRequestException('Passwords do not match.');
    }

    const foundUser = await this.userService.findByEmail(email);
    if (foundUser) {
      throw new BadRequestException('This email is already in use.');
    }

    const user = await this.userService.createUser({
      email,
      username,
      password,
    });

    const token = this.jwtService.sign({ userId: user.id, email });

    return { user, token };
  }

  async login(userId: number): Promise<AuthPayload> {
    const user = await this.userService.findById(userId);

    if (!user) {
      throw new NotFoundException('Uset not found!');
    }

    const token = this.jwtService.sign({ userId, email: user.email });

    return { user, token };
  }

  async autologin(req: Request): Promise<User | null> {
    const token = extractJwtFromCookie(req);
    if (!token) return null;

    const jwtData: JwtPayload = await this.jwtService.verifyAsync(token);

    const user = await this.userService.findById(Number(jwtData.userId));

    if (!user) {
      throw new NotFoundException('User not found!');
    }

    return user;
  }
}

export default AuthService;
