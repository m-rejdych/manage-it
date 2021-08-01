import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  ManyToOne,
  JoinTable,
  ManyToMany,
} from 'typeorm';

import User from '../user/user.entity';

@Entity()
class Project {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

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
}

export default Project;
