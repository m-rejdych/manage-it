import { IsInt } from 'class-validator';

export default class CreateMemberRequestDto {
  @IsInt({ message: 'Project id must be an integer.' })
  projectId: number;
}
