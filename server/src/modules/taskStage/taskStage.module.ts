import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import TaskStage from './taskStage.entity';
import TaskStageService from './taskStage.service';

@Module({
  imports: [TypeOrmModule.forFeature([TaskStage])],
  providers: [TaskStageService],
  exports: [TaskStageService],
})
class TaskStageModule {}

export default TaskStageModule;
