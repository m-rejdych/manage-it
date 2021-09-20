import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import AuthModule from './modules/auth';
import TypeOrmModule from './modules/db';
import UserModule from './modules/user';
import ProjectModule from './modules/project';
import ProjectStageModule from './modules/projectStage';
import TaskTypeModule from './modules/taskType';
import TaskPriorityModule from './modules/taskPriority';
import TaskStageModule from './modules/taskStage/taskStage.module';
import TaskModule from './modules/task';
import TagModule from './modules/tag';
import CheckpointModule from './modules/checkpoint';

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
    TaskStageModule,
    TaskModule,
    TagModule,
    CheckpointModule,
  ],
})
export class AppModule {}
