import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

import type TaskPriorityName from './types/name';
import type TaskPriorityKind from './types/kind';

@Entity()
class TaskPriority {
  @PrimaryGeneratedColumn()
  id: TaskPriorityKind;

  @Column({ unique: true })
  name: TaskPriorityName;
}

export default TaskPriority;
