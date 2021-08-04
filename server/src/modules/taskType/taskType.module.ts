import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import TaskType from './taskType.entity';
import TaskTypeService from './taskType.service';

@Module({
  imports: [TypeOrmModule.forFeature([TaskType])],
  providers: [TaskTypeService],
  exports: [TaskTypeService],
})
class TaskTypeModule {}

export default TaskTypeModule;
