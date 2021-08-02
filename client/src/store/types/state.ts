import { State as ThemeState } from '../ducks/theme/types';
import { State as AuthState } from '../ducks/auth/types';
import { State as ProjectState } from '../ducks/projects/types';

export interface RootState {
  theme: ThemeState;
  auth: AuthState;
  project: ProjectState;
}
