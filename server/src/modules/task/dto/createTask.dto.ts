import {
  IsString,
  MinLength,
  IsOptional,
  IsNumber,
  IsIn,
  IsArray,
  ArrayNotEmpty,
  ArrayUnique,
} from 'class-validator';

import TaskType from '../../taskType/types/name';
import TaskPriority from '../../taskPriority/types/name';
import taskTypes from '../../taskType/constants/names';
import taskPriority from '../../taskPriority/constants/names';

export default class CreateTaskDto {
  @IsString({ message: 'Title must be a string.' })
  @MinLength(3, { message: 'Title must be at least 3 characters long.' })
  title: string;

  @IsOptional()
  @IsString({ message: 'Description must be a string.' })
  description?: string;

  @IsNumber(undefined, { message: 'Project id must be a number.' })
  projectId: number;

  @IsIn(taskTypes, {
    message:
      'Type name must be one of the following: bug, task, improvement, problem.',
  })
  type: TaskType;

  @IsIn(taskPriority, {
    message:
      'Type name must be one of the following: minor, major, critical, nice-to-have.',
  })
  priority: TaskPriority;

  @IsOptional()
  @IsNumber(undefined, { message: 'Assigned to id must be a number.' })
  assignedToId?: number;

  @IsOptional()
  @IsArray({ message: 'Tags must be an array.' })
  @ArrayNotEmpty({ message: 'Tags can not be empty.' })
  @ArrayUnique({ message: 'Tags must be unique.' })
  tags?: string[];
}
