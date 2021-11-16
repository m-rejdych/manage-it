import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import MemberRequest from './memberRequest.entity';
import MemberRequestService from './memberRequest.service';

@Module({
  imports: [TypeOrmModule.forFeature([MemberRequest])],
  providers: [MemberRequestService],
  exports: [MemberRequestService],
})
class MemberRequestModule {}

export default MemberRequestModule;
