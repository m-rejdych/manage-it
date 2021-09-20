import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import Checkpoint from './checkpoint.entity';
import CheckpointService from './checkpoint.service';
import UserModule from '../user';

@Module({
  imports: [TypeOrmModule.forFeature([Checkpoint]), UserModule],
  providers: [CheckpointService],
  exports: [CheckpointService],
})
class CheckpointModule {}

export default CheckpointModule;
