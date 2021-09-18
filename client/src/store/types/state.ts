import { State as AuthState } from '../ducks/auth/types';
import { State as ProjectState } from '../ducks/projects/types';

export interface RootState {
  auth: AuthState;
  project: ProjectState;
}
