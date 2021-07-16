import { Request } from 'express';

export default (req: Request) => {
  let token: string | null = null;

  if (req?.cookies) {
    token = req.cookies['jwt'];
  }

  return token;
};
