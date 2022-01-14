import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

import Task from '../task/task.entity';
import User from '../user/user.entity';

@Entity()
class Checkpoint {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ default: false })
  isFinished: boolean;

  @ManyToOne(() => User)
  addedBy?: User;

  @ManyToOne(() => Task, (task) => task.checkpoints, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  task?: Task;
}

export default Checkpoint;
