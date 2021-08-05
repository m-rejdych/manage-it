import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import TaskTypeModule from '../taskType';
import TaskPriorityModule from '../taskPriority';
import TagModule from '../tag';
import UserModule from '../user';
import ProjectModule from '../project';
import Task from './task.entity';
import TaskService from './task.service';
import TaskController from './task.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Task]),
    UserModule,
    TaskTypeModule,
    TaskPriorityModule,
    TagModule,
    ProjectModule,
  ],
  providers: [TaskService],
  controllers: [TaskController],
})
class TaskModule {}

export default TaskModule;
