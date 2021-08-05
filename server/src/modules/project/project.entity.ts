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

@Entity()
class Project {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ type: 'text', nullable: true })
  description?: string;

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

  @OneToMany(() => Task, (task) => task.project, {
    cascade: ['insert', 'update'],
  })
  tasks: Task[];

  @ManyToMany(() => Tag, (tag) => tag.projects, {
    cascade: ['insert', 'update'],
  })
  tags: Tag[];
}

export default Project;
