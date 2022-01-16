import { IsInt } from 'class-validator';

export default class AcceptMemberRequestDto {
  @IsInt({ message: 'Project id must be an integer.' })
  requestId: number;
}
