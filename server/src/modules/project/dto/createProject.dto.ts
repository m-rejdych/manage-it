import {
  MinLength,
  IsString,
  IsArray,
  ArrayNotEmpty,
  IsOptional,
} from 'class-validator';

export default class CreateProjectDto {
  @IsString({ message: 'Title must be a string!' })
  @MinLength(3, { message: 'Title must be at least 3 characters long.' })
  title: string;

  @IsString({ message: 'Description must be a string!' })
  @MinLength(3, { message: 'Description must be at least 3 characters long.' })
  description: string;

  @IsOptional()
  @IsArray({ message: 'Tags must be array.' })
  @ArrayNotEmpty({ message: 'Tags array must not be empty.' })
  tags?: string[];
}
