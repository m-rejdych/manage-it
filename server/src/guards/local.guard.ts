import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
class LocalGuard extends AuthGuard('local') {}

export default LocalGuard;
