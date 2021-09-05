import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import ProjectStageService from './projectStage.service';
import ProjectStage from './projectStage.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProjectStage])],
  providers: [ProjectStageService],
  exports: [ProjectStageService],
})
class ProjectStageModule {}

export default ProjectStageModule;
