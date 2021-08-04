import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  ManyToMany,
} from 'typeorm';

import TaskType from '../taskType/taskType.entity';
import TaskPriority from '../taskPriority/taskPriority.entity';
import Project from '../project/project.entity';
import User from '../user/user.entity';
import Tag from '../tag/tag.entitiy';

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

  @ManyToOne(() => User, (user) => user.createdTasks, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  creator: User;

  @ManyToOne(() => Project, (project) => project.tasks)
  project: Project;

  @ManyToOne(() => User, (user) => user.assignedTasks, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  assignedTo: User;

  @ManyToOne(() => TaskType, { cascade: true, onDelete: 'CASCADE' })
  type: TaskType;

  @ManyToOne(() => TaskPriority, { cascade: true, onDelete: 'CASCADE' })
  priority: TaskPriority;

  @ManyToMany(() => Tag, (tag) => tag.tasks)
  tags: Tag[];
}

export default Task;
