import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import ProjectService from './project.service';
import ProjectController from './project.controller';
import Project from './project.entity';
import ProjectStageModule from '../projectStage';
import UserModule from '../user';
import TagModule from '../tag';
import MemberRequestModule from '../memberRequest';

@Module({
  imports: [
    TypeOrmModule.forFeature([Project]),
    UserModule,
    TagModule,
    ProjectStageModule,
    MemberRequestModule,
  ],
  providers: [ProjectService],
  controllers: [ProjectController],
  exports: [ProjectService],
})
class ProjectModule {}

export default ProjectModule;
