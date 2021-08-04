import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  OneToMany,
  ManyToMany,
} from 'typeorm';

import Project from '../project/project.entity';
import Task from '../task/task.entity';

@Entity()
class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  username: string;

  @Column({ select: false })
  password: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Project, (project) => project.creator, {
    cascade: ['insert', 'update'],
  })
  createdProjects: Project[];

  @ManyToMany(() => Project, (project) => project.members, {
    cascade: ['insert', 'update'],
  })
  projects: Project[];

  @OneToMany(() => Task, (task) => task.creator, {
    cascade: ['insert', 'update'],
  })
  createdTasks: Task[];

  @OneToMany(() => Task, (task) => task.assignedTo, {
    cascade: ['insert', 'update'],
  })
  assignedTasks: Task[];
}

export default User;
