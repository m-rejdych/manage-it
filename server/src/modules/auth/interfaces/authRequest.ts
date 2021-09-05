import { Request } from 'express';

import User from '../../user/user.entity';

interface JwtUser {
  userId: number;
  email: string;
}

export interface LocalAuthRequest extends Request {
  user: Omit<User, 'password'>;
}

export interface JwtAuthRequest extends Request {
  user: JwtUser;
}
