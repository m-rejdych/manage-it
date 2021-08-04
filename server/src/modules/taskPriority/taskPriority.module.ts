import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import TaskPriority from './taskPriority.entity';
import TaskPriorityService from './taskPriority.service';

@Module({
  imports: [TypeOrmModule.forFeature([TaskPriority])],
  providers: [TaskPriorityService],
  exports: [TaskPriorityService],
})
class TaskPriorityModule {}

export default TaskPriorityModule;
