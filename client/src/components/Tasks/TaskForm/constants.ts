import { SelectProps as SelectPropsType } from '@mui/material';

import SelectOption from '../../../types/SelectOption';
import TaskTypeName from '../../../types/taskType/TaskTypeName';
import TaskPriorityName from '../../../types/taskPriority/TaskPriorityName';
import Field from '../../../types/FormField';
import SearchItem from '../../Search/types/SearchItem';
import validateInput from '../../../util/validateInput';
import {
  taskPriorities,
  taskTypes,
  TASK_TYPE_ICONS,
  TASK_PRIORITY_ICONS,
} from '../../../constants/task';

export interface Values {
  title: string;
  description: string;
  type: TaskTypeName;
  priority: TaskPriorityName;
  estimate: string;
  checkpoints: string[];
  assignedTo?: SearchItem | null;
}

export const initialValues: Values = {
  title: '',
  description: '',
  type: 'task',
  priority: 'major',
  estimate: '',
  checkpoints: [],
  assignedTo: null,
};

const typeOptipns: SelectOption<TaskTypeName>[] = taskTypes.map((type) => ({
  value: type,
  label: type[0].toUpperCase() + type.slice(1),
  icon: TASK_TYPE_ICONS[type],
}));

const priorityOptions: SelectOption<TaskPriorityName>[] = taskPriorities.map((priority) => ({
  value: priority,
  label:
    priority === 'nice-to-have' ? 'Nice to have' : priority[0].toUpperCase() + priority.slice(1),
  icon: TASK_PRIORITY_ICONS[priority],
}));

const SelectProps: SelectPropsType = {
  sx: {
    '> div': {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
  },
};

export const fields: Field<Values>[] = [
  {
    name: 'title',
    label: 'Title',
    type: 'text',
    validate: (value) => {
      const error = validateInput(value, { length: 3 })
        ? undefined
        : 'Title must be at least 3 characters long.';

      return error;
    },
  },
  {
    name: 'description',
    label: 'Decsription',
    type: 'text',
    multiline: true,
    rows: 5,
  },
  {
    name: 'type',
    label: 'Type',
    select: true,
    options: typeOptipns,
    SelectProps,
    validate: (value) => {
      const error = validateInput(value, { inArray: taskTypes }) ? undefined : 'Invalid task type.';

      return error;
    },
  },
  {
    name: 'priority',
    label: 'Priority',
    select: true,
    options: priorityOptions,
    SelectProps,
    validate: (value) => {
      const error = validateInput(value, { inArray: taskPriorities })
        ? undefined
        : 'Invalid task priority.';

      return error;
    },
  },
  {
    name: 'estimate',
    label: 'Estimate (hours)',
    type: 'text',
    validate: (value) => {
      const error = validateInput(value, { regexp: /^\d+$/ })
        ? undefined
        : 'Estination must be a positive number';

      return error;
    },
  },
  {
    name: 'checkpoints',
    placeholder: 'Enter checkpoint name...',
    validate: (values) => {
      const error = validateInput(values, { length: 2 })
        ? undefined
        : 'You need at least 2 checkpoints to keep track of the task.';

      return error;
    },
  },
  {
    name: 'assignedTo',
    label: 'Assignee',
    placeholder: 'Search user...',
    type: 'text',
  }
];
