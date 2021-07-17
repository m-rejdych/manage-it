import { State as ThemeState } from '../ducks/theme/types';
import { State as AuthState } from '../ducks/auth/types';

export interface RootState {
  theme: ThemeState;
  auth: AuthState;
}
