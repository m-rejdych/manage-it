import {
  IsString,
  MinLength,
  IsOptional,
  IsInt,
  Min,
  IsIn,
  IsArray,
  ArrayNotEmpty,
  ArrayUnique,
  ArrayMinSize,
} from 'class-validator';

import TaskType from '../../taskType/types/name';
import TaskPriority from '../../taskPriority/types/name';
import taskTypes from '../../taskType/constants/names';
import taskPriorities from '../../taskPriority/constants/names';

export default class CreateTaskDto {
  @IsString({ message: 'Title must be a string.' })
  @MinLength(3, { message: 'Title must be at least 3 characters long.' })
  title: string;

  @IsOptional()
  @IsString({ message: 'Description must be a string.' })
  description?: string;

  @IsInt({ message: 'Estimate must be a positive number.' })
  @Min(0, { message: 'Estimate must be a positive number.' })
  estimate: number;

  @IsInt({ message: 'Project id must be a number.' })
  projectId: number;

  @IsIn(taskTypes, {
    message:
      'Type name must be one of the following: bug, task, improvement, problem.',
  })
  type: TaskType;

  @IsIn(taskPriorities, {
    message:
      'Type name must be one of the following: minor, major, critical, nice-to-have.',
  })
  priority: TaskPriority;

  @IsOptional()
  @IsInt({ message: 'Assigned to id must be a number.' })
  assignedToId?: number;

  @IsArray({ message: 'Checkpoints must be an array.' })
  @ArrayUnique({ message: 'Checkpoints must be unique.' })
  @ArrayMinSize(2, { message: 'There must be at least 2 checkpoints.' })
  checkpoints: string[];

  @IsOptional()
  @IsArray({ message: 'Tags must be an array.' })
  @ArrayNotEmpty({ message: 'Tags can not be empty.' })
  @ArrayUnique({ message: 'Tags must be unique.' })
  tags?: string[];
}
