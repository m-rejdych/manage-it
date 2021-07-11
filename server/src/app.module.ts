import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';

import AuthModule from './modules/auth';
import TypeOrmModule from './modules/db';

@Module({
  imports: [ConfigModule.forRoot(), TypeOrmModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
