import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import TaskTypeModule from '../taskType';
import TaskPriorityModule from '../taskPriority';
import Task from './task.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Task]),
    TaskTypeModule,
    TaskPriorityModule,
  ],
})
class TaskModule {}

export default TaskModule;
