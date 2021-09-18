import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  ManyToOne,
  JoinTable,
  ManyToMany,
  OneToMany,
} from 'typeorm';

import User from '../user/user.entity';
import Tag from '../tag/tag.entitiy';
import Task from '../task/task.entity';
import ProjectStage from '../projectStage/projectStage.entity';

@Entity()
class Project {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @Column({ type: 'integer', nullable: true })
  maxMembers: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.createdProjects, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  creator: User;

  @ManyToMany(() => User, (user) => user.projects, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  @JoinTable()
  members: User[];

  @ManyToMany(() => User, { cascade: true, onDelete: 'CASCADE' })
  admins: User[];

  @OneToMany(() => Task, (task) => task.project, {
    cascade: ['insert', 'update'],
  })
  tasks: Task[];

  @ManyToMany(() => Tag, (tag) => tag.projects, {
    cascade: ['insert', 'update'],
  })
  tags: Tag[];

  @ManyToOne(() => ProjectStage, (projectStage) => projectStage.projects, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  stage: ProjectStage;
}

export default Project;
