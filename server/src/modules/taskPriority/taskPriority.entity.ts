import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

import TaskPriorityName from './types/name';

@Entity()
class TaskPriority {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: TaskPriorityName;
}

export default TaskPriority;
