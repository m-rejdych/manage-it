import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

import type TaskTypeName from './types/name';
import type TaskTypeKind from './types/kind';

@Entity()
class TaskType {
  @PrimaryGeneratedColumn()
  id: TaskTypeKind;

  @Column({ unique: true })
  name: TaskTypeName;
}

export default TaskType;
