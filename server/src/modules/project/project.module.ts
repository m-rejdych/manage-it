import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import ProjectService from './project.service';
import ProjectController from './project.controller';
import Project from './project.entity';
import UserModule from '../user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([Project]), UserModule],
  providers: [ProjectService],
  controllers: [ProjectController],
})
class ProjectModule {}

export default ProjectModule;
