import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { compare } from 'bcrypt';

import UserService from '../user/user.service';
import User from '../user/user.entity';
import RegisterDto from './dto/register.dto';
import AuthResponseDto from './dto/authResponse.dto';

@Injectable()
class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(
    email: string,
    password: string,
  ): Promise<Partial<User> | null> {
    const user = await this.userService.findByEmail(email);
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
  }: RegisterDto): Promise<AuthResponseDto> {
    if (password !== repeatPassword) {
      throw new BadRequestException('Passwords does not match.');
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

    return { userId: user.id, email, token };
  }
}

export default AuthService;
