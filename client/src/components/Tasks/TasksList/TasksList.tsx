import React from 'react';
import { Stack } from '@mui/material';

import TasksListItem from './TasksListItem';
import Task from '../../../types/task';

interface Props {
  tasks?: Task[];
}

const TasksList: React.FC<Props> = ({ tasks }) => {
  return tasks?.length ? (
    <Stack spacing={3}>
      {tasks.map(({ id, ...task }) => (
        <TasksListItem {...task} key={`task-${id}`} />
      ))}
    </Stack>
  ) : null;
};

export default TasksList;
