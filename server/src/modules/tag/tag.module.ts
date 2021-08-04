import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import ProjectModule from '../project';
import TaskModule from '../task';
import Tag from './tag.entitiy';

@Module({
  imports: [TypeOrmModule.forFeature([Tag]), ProjectModule, TaskModule],
})
class TagModule {}

export default TagModule;
