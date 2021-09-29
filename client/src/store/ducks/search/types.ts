import User from '../../../types/user';

export interface State {
  users: User[];
  loading: boolean;
  error: string | null;
}
