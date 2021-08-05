import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import TaskTypeService from '../taskType/taskType.service';
import TaskPriorityModule from '../taskPriority/taskPriority.service';
import Task from './task.entity';

@Injectable()
class TaskService {
  constructor(
    @InjectRepository(Task) private taskRepository: Repository<Task>,
  ) {}

  async getTaskById(id: number): Promise<Task | null> {
    const task = this.taskRepository.findOne(id);

    return task || null;
  }
}

export default TaskService;
