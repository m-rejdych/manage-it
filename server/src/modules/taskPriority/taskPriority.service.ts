import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import TaskPriority from './taskPriority.entity';
import TaskPriorityName from './types/name';

@Injectable()
class TaskPriorityService {
  constructor(
    @InjectRepository(TaskPriority)
    private taskPriorityRepository: Repository<TaskPriority>,
  ) {}

  async findByName(name: TaskPriorityName): Promise<TaskPriority | null> {
    const taskPriority = await this.taskPriorityRepository.findOne({ name });

    return taskPriority || null;
  }

  async createTaskPriority(name: TaskPriorityName): Promise<TaskPriority> {
    let taskPriority = await this.findByName(name);
    if (taskPriority) {
      throw new BadRequestException(
        'Task priority with this name already exists.',
      );
    }

    taskPriority = this.taskPriorityRepository.create({ name });
    await this.taskPriorityRepository.save(taskPriority);

    return taskPriority;
  }
}

export default TaskPriorityService;
