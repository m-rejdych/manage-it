import User from '../../user/user.entity';

export default class AuthPayload {
  user: User;
  token: string;
}
