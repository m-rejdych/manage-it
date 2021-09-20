import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import TaskType from './taskType.entity';
import TaskTypeName from './types/name';
import Task from './taskType.entity';

@Injectable()
class TaskTypeService {
  constructor(
    @InjectRepository(TaskType)
    private taskTypeRepository: Repository<TaskType>,
  ) {}

  async findByName(name: TaskTypeName): Promise<Task | null> {
    const taskType = await this.taskTypeRepository.findOne({ name });

    return taskType || null;
  }

  async craeteTaskType(name: TaskTypeName): Promise<TaskType> {
    const foundTaskType = await this.findByName(name);
    if (foundTaskType) {
      throw new BadRequestException('Task type with this name already exists.');
    }

    const taskType = this.taskTypeRepository.create({ name });
    await this.taskTypeRepository.save(taskType);

    return taskType;
  }
}

export default TaskTypeService;
