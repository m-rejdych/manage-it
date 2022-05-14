import TaskPriorityName from './TaskPriorityName';

export enum TaskPriorityKind {
  Minor = 1,
  Major,
  Critical,
  NiceToHave,
}

export default interface TaskPriority {
  id: TaskPriorityKind;
  name: TaskPriorityName;
}
