import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import TaskStage from './taskStage.entity';
import TaskStageName from './types/name';

@Injectable()
class TaskStageService {
  constructor(
    @InjectRepository(TaskStage)
    private taskStageRepository: Repository<TaskStage>,
  ) {}

  async findByName(name: TaskStageName): Promise<TaskStage> {
    const taskStage = await this.taskStageRepository.findOne({ name });

    return taskStage || null;
  }

  async createTaskStage(name: TaskStageName): Promise<TaskStage> {
    const foundTaskStage = await this.findByName(name);
    if (foundTaskStage) {
      throw new BadRequestException(
        'Task stage with this name already exists.',
      );
    }

    const taskStage = this.taskStageRepository.create({ name });
    await this.taskStageRepository.save(taskStage);

    return taskStage;
  }
}

export default TaskStageService;
