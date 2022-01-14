import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  ManyToMany,
  OneToMany,
} from 'typeorm';

import TaskType from '../taskType/taskType.entity';
import TaskPriority from '../taskPriority/taskPriority.entity';
import TaskStage from '../taskStage/taskStage.entity';
import Project from '../project/project.entity';
import User from '../user/user.entity';
import Tag from '../tag/tag.entitiy';
import Checkpoint from '../checkpoint/checkpoint.entity';

@Entity()
class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @Column()
  estimate: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.createdTasks, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  creator?: User;

  @ManyToOne(() => Project, (project) => project.tasks)
  project?: Project;

  @ManyToOne(() => User, (user) => user.assignedTasks, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  assignedTo?: User;

  @ManyToOne(() => TaskType, { cascade: true, onDelete: 'CASCADE' })
  type?: TaskType;

  @ManyToOne(() => TaskPriority, { cascade: true, onDelete: 'CASCADE' })
  priority?: TaskPriority;

  @ManyToOne(() => TaskStage, { cascade: true, onDelete: 'CASCADE' })
  stage?: TaskStage;

  @OneToMany(() => Checkpoint, (checkpoint) => checkpoint.task, {
    cascade: ['insert', 'update'],
  })
  checkpoints?: Checkpoint[];

  @ManyToMany(() => Tag, (tag) => tag.tasks, { cascade: ['insert', 'update'] })
  tags?: Tag[];
}

export default Task;
