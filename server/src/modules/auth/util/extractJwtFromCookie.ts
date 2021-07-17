import { JwtFromRequestFunction } from 'passport-jwt';

const extractJwtFromCookie: JwtFromRequestFunction = (req) => {
  let token: string | null = null;

  if (req?.cookies) {
    token = req.cookies.jwt;
  }

  return token;
};

export default extractJwtFromCookie;
