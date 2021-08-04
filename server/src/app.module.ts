import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import AuthModule from './modules/auth';
import TypeOrmModule from './modules/db';
import UserModule from './modules/user';
import ProjectModule from './modules/project';
import TaskTypeModule from './modules/taskType/taskType.module';
import TaskPriorityModule from './modules/taskPriority/taskPriority.module';
import Task from './modules/task';
import Tag from './modules/tag';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule,
    AuthModule,
    UserModule,
    ProjectModule,
    TaskTypeModule,
    TaskPriorityModule,
    Task,
    Tag,
  ],
})
export class AppModule {}
