import { State as AuthState } from '../ducks/auth/types';
import { State as ProjectState } from '../ducks/projects/types';
import { State as TaskState } from '../ducks/task/types';
import { State as SearchState } from '../ducks/search/types';

export interface RootState {
  auth: AuthState;
  project: ProjectState;
  task: TaskState;
  search: SearchState;
}
