import type { FC } from 'react';
import { Typography, Stack } from '@mui/material';

import type Task from '../../../types/task';
import {
  TASK_TYPE_DISPLAY_NAMES,
  TASK_STAGE_DISPLAY_NAMES,
  TASK_PRIORITY_DISPLAY_NAMES,
} from '../../../constants/task';

interface Field {
  label: string;
  value?: string;
}

const TaskDetails: FC<Task> = ({
  title,
  description,
  createdAt,
  updatedAt,
  type,
  stage,
  priority,
  creator,
  assignedTo,
}) => {
  const fields: Field[] = [
    {
      label: 'Description',
      value: description,
    },
    {
      label: 'Created at',
      value: createdAt.toString(),
    },
    {
      label: 'Updated at',
      value: updatedAt.toString(),
    },
    {
      label: 'Type',
      value: type && TASK_TYPE_DISPLAY_NAMES[type.id],
    },
    {
      label: 'Stage',
      value: stage && TASK_STAGE_DISPLAY_NAMES[stage.id],
    },
    {
      label: 'Priority',
      value: priority && TASK_PRIORITY_DISPLAY_NAMES[priority.id],
    },
    {
      label: 'Creator',
      value: creator && creator.username,
    },
    {
      label: 'Assigned to',
      value: assignedTo && assignedTo.username,
    },
  ];

  return (
    <Stack spacing={5}>
      <Typography variant="h4">{title}</Typography>
      <Stack spacing={2}>
        {fields.map(({ value, label }) => (
          <Stack direction="row" spacing={1}>
            <Typography sx={{ fontWeight: 700 }}>{`${label}:`}</Typography>
            <Typography color={value ? 'textPrimary' : 'textSecondary'}>
              {value ?? 'None'}
            </Typography>
          </Stack>
        ))}
      </Stack>
    </Stack>
  );
};

export default TaskDetails;
