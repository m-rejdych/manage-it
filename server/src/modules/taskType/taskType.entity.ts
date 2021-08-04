import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

import TaskTypeName from './types/name';

@Entity()
class TaskType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: TaskTypeName;
}

export default TaskType;
