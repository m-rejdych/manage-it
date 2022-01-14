import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
  Column,
} from 'typeorm';

import Project from '../project/project.entity';
import Task from '../task/task.entity';

@Entity()
class Tag {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToMany(() => Project, (project) => project.tags, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  @JoinTable()
  projects?: Project[];

  @ManyToMany(() => Task, (task) => task.tags, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  @JoinTable()
  tasks?: Task[];
}

export default Tag;
