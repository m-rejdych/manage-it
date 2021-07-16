import { Request } from 'express';

import User from '../../user/user.entity';

export default interface AuthRequest extends Request {
  user: Omit<User, 'password'>;
}
