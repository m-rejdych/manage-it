import { MinLength } from 'class-validator';

export default class CreateProjectDto {
  @MinLength(3, { message: 'Title must be at least 3 characters long.' })
  title: string;

  @MinLength(3, { message: 'Description must be at least 3 characters long.' })
  description: string;
}
