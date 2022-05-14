import TaskTypeName from './TaskTypeName';

export enum TaskTypeKind {
  Bug = 1,
  Task,
  Improvement,
  Problem,
}

export default interface TaskType {
  id: TaskTypeKind;
  name: TaskTypeName;
}
