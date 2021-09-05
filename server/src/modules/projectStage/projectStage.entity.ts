import { Entity, PrimaryGeneratedColumn, OneToMany, Column } from 'typeorm';

import ProjectStageName from './interfaces/projectStageName';
import Project from '../project/project.entity';

@Entity()
class ProjectStage {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: ProjectStageName;

  @OneToMany(() => Project, (project) => project.stage, {
    cascade: ['insert', 'update'],
  })
  projects: Project[];
}

export default ProjectStage;
