import TaskTypeName from '../taskType/TaskTypeName';
import TaskPriorityName from '../taskPriority/TaskPriorityName';

export interface CreateTaskPayload {
  projectId: number;
  title: string;
  description: string;
  estimate: number;
  type: TaskTypeName;
  priority: TaskPriorityName;
  assignedToId?: number;
  checkpoints?: string[];
  tags?: string[];
}
