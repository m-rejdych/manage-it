import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

import type TaskStageName from './types/name';
import type TaskStageKind from './types/kind';

@Entity()
class TaskStage {
  @PrimaryGeneratedColumn()
  id: TaskStageKind;

  @Column({ unique: true })
  name: TaskStageName;
}

export default TaskStage;
