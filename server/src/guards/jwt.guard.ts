import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
class JwtGuard extends AuthGuard('jwt') {}

export default JwtGuard;
