import { Injectable } from '@nestjs/common';
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

  async getTaskTypeByName(name: TaskTypeName): Promise<Task | null> {
    const taskType = await this.taskTypeRepository.findOne({ name });

    return taskType || null;
  }

  async craeteTask(name: TaskTypeName): Promise<TaskType> {
    const taskType = this.taskTypeRepository.create({ name });
    await this.taskTypeRepository.save(taskType);

    return taskType;
  }
}

export default TaskTypeService;
