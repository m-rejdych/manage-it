import { Injectable } from '@nestjs/common';
import { TypeOrmOptionsFactory, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';

import User from '../user/user.entity';
import Project from '../project/project.entity';
import TaskType from '../taskType/taskType.entity';
import TaskPriority from '../taskPriority/taskPriority.entity';
import Task from '../task/task.entity';
import Tag from '../tag/tag.entitiy';

const entities = [User, Project, TaskType, TaskPriority, Task, Tag];

@Injectable()
class TypeOrmService implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      name: this.configService.get('DB_NAME') as string,
      database: this.configService.get('DB_DATABASE') as string,
      username: this.configService.get('DB_USERNAME') as string,
      password: this.configService.get('DB_PASSWORD') as string,
      port: +this.configService.get('DB_PORT') as number,
      host: this.configService.get('DB_HOST') as string,
      type: this.configService.get('DB_TYPE') as 'postgres',
      autoLoadEntities: true,
      synchronize: true,
      logging: true,
      entities,
    };
  }
}

export default TypeOrmService;
