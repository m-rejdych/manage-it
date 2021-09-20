import Task from '../task';
import User from '../user';

export default interface Checkpoint {
  id: number;
  name: string;
  isFinished: boolean;
  addedBy?: User;
  task?: Task;
}
