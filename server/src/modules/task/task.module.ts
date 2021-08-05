import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import TaskTypeModule from '../taskType';
import TaskPriorityModule from '../taskPriority';
import Task from './task.entity';
import TaskService from './task.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Task]),
    TaskTypeModule,
    TaskPriorityModule,
  ],
  providers: [TaskService],
})
class TaskModule {}

export default TaskModule;
