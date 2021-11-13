import User from '../user';
import Project from '../project';
import TaskType from '../taskType';
import TaskPriority from '../taskPriority';
import TaskStage from '../taskStage';
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
  stage?: TaskStage;
  checkpoints?: Checkpoint[];
  tags?: Tag[];
}
