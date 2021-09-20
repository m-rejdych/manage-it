import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

import TaskStageName from './types/name';

@Entity()
class TaskStage {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: TaskStageName;
}

export default TaskStage;
