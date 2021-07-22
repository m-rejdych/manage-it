import User from '../../../types/user';

export interface State {
  isAuth: boolean;
  user: User | null;
  loading: boolean;
  initialLoad: boolean;
  error: string | null;
}
