import { hash } from 'bcrypt';
import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

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

  async findById(id: number): Promise<User> {
    const user = await this.userRepository.findOne(id);

    if (!user) {
      throw new NotFoundException('User not found!');
    }

    return user;
  }

  async createUser({
    email,
    username,
    password,
  }: CreateUserDto): Promise<User> {
    const foundUser = await this.findByEmail(email);
    if (foundUser) {
      throw new BadRequestException('This email is already in use.');
    }

    const hashedPassword = await hash(password, 12);

    const user = this.userRepository.create({
      email,
      username,
      password: hashedPassword,
    });
    await this.userRepository.save(user);

    return user;
  }
}

export default UserService;
