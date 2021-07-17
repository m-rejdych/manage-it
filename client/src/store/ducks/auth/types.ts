import User from '../../../types/user';

export interface State {
  isAuth: boolean;
  user: User | null;
  loading: boolean;
  error: string | null;
}
