import TaskStageName from './taskStageName';

export enum TaskStageKind {
  Open = 1, 
  Progress,
  Closed,
}

export default interface TaskStage {
  id: TaskStageKind;
  name: TaskStageName;
}
