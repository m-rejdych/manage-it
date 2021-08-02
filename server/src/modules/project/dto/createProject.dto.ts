import { MinLength } from 'class-validator';

export default class CreateProjectDto {
  @MinLength(3)
  title: string;
}
