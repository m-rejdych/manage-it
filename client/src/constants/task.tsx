import {
  TaskAlt,
  BugReport,
  AddToPhotos,
  ReportProblem,
  ArrowCircleUp,
  ArrowCircleDown,
  NotificationImportant,
  ThumbUp,
} from '@mui/icons-material';

import type TaskTypeName from '../types/taskType/TaskTypeName';
import TaskPriorityName from '../types/taskPriority/TaskPriorityName';
import { TaskPriorityKind } from '../types/taskPriority/TaskPriority';
import { TaskStageKind } from '../types/taskStage/TaskStage';
import { TaskTypeKind } from '../types/taskType/TaskType';

export const taskTypes: TaskTypeName[] = [
  'bug',
  'task',
  'improvement',
  'problem',
];

export const taskPriorities: TaskPriorityName[] = [
  'minor',
  'major',
  'critical',
  'nice-to-have',
];

export const TASK_TYPE_ICONS: Record<TaskTypeName, JSX.Element> = {
  bug: <BugReport color="error" />,
  improvement: <AddToPhotos color="success" />,
  problem: <ReportProblem color="warning" />,
  task: <TaskAlt color="primary" />,
};

export const TASK_PRIORITY_ICONS: Record<TaskPriorityName, JSX.Element> = {
  'nice-to-have': <ThumbUp color="success" />,
  minor: <ArrowCircleDown color="primary" />,
  major: <ArrowCircleUp color="secondary" />,
  critical: <NotificationImportant color="error" />,
};

export const TASK_PRIORITY_DISPLAY_NAMES: Record<TaskPriorityKind, string> = {
  [TaskPriorityKind.Minor]: 'Minor',
  [TaskPriorityKind.Major]: 'Major',
  [TaskPriorityKind.Critical]: 'Critical',
  [TaskPriorityKind.NiceToHave]: 'Nice to have',
};

export const TASK_STAGE_DISPLAY_NAMES: Record<TaskStageKind, string> = {
  [TaskStageKind.Open]: 'Open',
  [TaskStageKind.Progress]: 'Progress',
  [TaskStageKind.Closed]: 'Closed',
};

export const TASK_TYPE_DISPLAY_NAMES: Record<TaskTypeKind, string> = {
  [TaskTypeKind.Bug]: 'Bug',
  [TaskTypeKind.Task]: 'Task',
  [TaskTypeKind.Improvement]: 'Improvement',
  [TaskTypeKind.Problem]: 'Problem',
};
