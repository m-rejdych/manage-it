import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';

import TaskType from '../taskType/taskType.entity';
import TaskPriority from '../taskPriority/taskPriority.entity';
import User from '../user/user.entity';

@Entity()
class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.createdTasks)
  creator: User;

  @ManyToOne(() => User, (user) => user.assignedTasks)
  assignedTo: User;

  @ManyToOne(() => TaskType)
  type: TaskType;

  @ManyToOne(() => TaskPriority)
  priority: TaskPriority;
}

export default Task;
