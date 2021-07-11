import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

import TypeOrmService from './db.service';

export default TypeOrmModule.forRootAsync({
  imports: [ConfigModule],
  useClass: TypeOrmService,
});
