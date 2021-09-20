import Task from '../../../types/task';

export interface State {
  tasks: Task[];
  openedTask: Task | null;
  loading: boolean;
  error: string | null;
}
