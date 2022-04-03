import { IsInt } from 'class-validator';

export default class MakeAdminDto {
  @IsInt({ message: 'memberId must be an integer.' })
  memberId: number;

  @IsInt({ message: 'projectId must be an integer.' })
  projectId: number;
}
