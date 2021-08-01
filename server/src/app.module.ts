import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import AuthModule from './modules/auth';
import TypeOrmModule from './modules/db';
import UserModule from './modules/user';
import ProjectModule from './modules/project';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule,
    AuthModule,
    UserModule,
    ProjectModule,
  ],
})
export class AppModule {}
