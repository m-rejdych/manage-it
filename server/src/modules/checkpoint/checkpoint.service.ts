import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import Checkpoint from './checkpoint.entity';
import UserService from '../user/user.service';

@Injectable()
class CheckpointService {
  constructor(
    @InjectRepository(Checkpoint)
    private checkpointRepository: Repository<Checkpoint>,
    private userService: UserService,
  ) {}

  async createCheckpoint(userId: number, name: string): Promise<Checkpoint> {
    const user = await this.userService.findById(userId);

    if (!user) {
      throw new NotFoundException('User not found.');
    }

    const checkpoint = this.checkpointRepository.create({
      name,
      addedBy: user,
    });

    await this.checkpointRepository.save(checkpoint);

    return checkpoint;
  }
}

export default CheckpointService;
