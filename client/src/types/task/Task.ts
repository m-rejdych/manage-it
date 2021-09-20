import User from '../user';
import Project from '../project';
import TaskType from '../taskType';
import TaskPriority from '../taskPriority';
import Tag from '../tag';
import Checkpoint from '../checkpoint';

export default interface Task {
  id: number;
  title: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
  creator?: User;
  project?: Project;
  assignedTo?: User;
  type?: TaskType;
  priority?: TaskPriority;
  checkpoints?: Checkpoint[];
  tags?: Tag[];
}
