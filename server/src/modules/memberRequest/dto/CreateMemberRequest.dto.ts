import { IsInt } from 'class-validator';

export default class CreateMemberRequestDto {
  @IsInt()
  projectId: number;
}
