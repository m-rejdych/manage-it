import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import AuthModule from './modules/auth';
import TypeOrmModule from './modules/db';
import UserModule from './modules/user';
import ProjectModule from './modules/project';
import ProjectStageModule from './modules/projectStage';
import TaskTypeModule from './modules/taskType';
import TaskPriorityModule from './modules/taskPriority';
import Task from './modules/task';
import Tag from './modules/tag';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule,
    AuthModule,
    UserModule,
    ProjectModule,
    ProjectStageModule,
    TaskTypeModule,
    TaskPriorityModule,
    Task,
    Tag,
  ],
})
export class AppModule {}
