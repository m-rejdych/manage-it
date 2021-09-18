import { hash } from 'bcrypt';
import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOneOptions } from 'typeorm';

import User from './user.entity';
import CreateUserDto from './dto/create-user.dto';
import FindOptions from '../auth/interfaces/find-options';

@Injectable()
class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async findByEmail(
    email: string,
    options?: FindOptions,
  ): Promise<User | null> {
    const user = options?.withPassword
      ? await this.userRepository
          .createQueryBuilder('user')
          .where('user.email = :email', { email })
          .addSelect('user.password')
          .getOne()
      : await this.userRepository.findOne({ email });

    return user || null;
  }

  async findById(id: number, options?: FindOneOptions): Promise<User | null> {
    const user = await this.userRepository.findOne(id, options);

    return user || null;
  }

  async createUser({
    email,
    username,
    password,
  }: CreateUserDto): Promise<User> {
    let user = await this.findByEmail(email);
    if (user) {
      throw new BadRequestException('This email is already in use.');
    }

    const hashedPassword = await hash(password, 12);

    user = this.userRepository.create({
      email,
      username,
      password: hashedPassword,
    });
    await this.userRepository.save(user);

    return user;
  }
}

export default UserService;
