import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import TaskTypeModule from '../taskType';
import TaskPriorityModule from '../taskPriority';
import TaskStageModule from '../taskStage';
import TagModule from '../tag';
import UserModule from '../user';
import ProjectModule from '../project';
import CheckpointModule from '../checkpoint';
import Task from './task.entity';
import TaskService from './task.service';
import TaskController from './task.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Task]),
    UserModule,
    TaskTypeModule,
    TaskPriorityModule,
    TaskStageModule,
    TagModule,
    ProjectModule,
    CheckpointModule,
  ],
  providers: [TaskService],
  controllers: [TaskController],
})
class TaskModule {}

export default TaskModule;
