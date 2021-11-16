import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';

import User from '../user/user.entity';
import Project from '../project/project.entity';

@Entity()
class MemberRequest {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: false })
  isAccepted: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => User, { cascade: true })
  requestedBy: User;

  @ManyToOne(() => User, { cascade: true })
  acceptedBy: User;

  @ManyToOne(() => Project, (project) => project.requests, { cascade: true })
  project: Project;
}

export default MemberRequest;
