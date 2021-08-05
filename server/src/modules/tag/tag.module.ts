import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import Tag from './tag.entitiy';
import TagService from './tag.service';

@Module({
  imports: [TypeOrmModule.forFeature([Tag])],
  providers: [TagService],
  exports: [TagService],
})
class TagModule {}

export default TagModule;
