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

import TaskTypeName from '../types/taskType/TaskTypeName';
import TaskPriorityName from '../types/taskPriority/TaskPriorityName';

export const taskTypes: TaskTypeName[] = ['bug', 'task', 'improvement', 'problem'];

export const taskPriorities: TaskPriorityName[] = ['minor', 'major', 'critical', 'nice-to-have'];

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
