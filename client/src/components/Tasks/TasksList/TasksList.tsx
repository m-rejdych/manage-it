import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Stack } from '@mui/material';

import TasksListItem from './TasksListItem';
import { getTasksByProjectId, reset } from '../../../store/ducks/task/actions';
import { RootState } from '../../../store/types/state';

interface Props {
  projectId: number;
}

const TasksList: React.FC<Props> = ({ projectId }) => {
  const tasks = useSelector((state: RootState) => state.task.tasks);
  const dispatch = useDispatch();

  useEffect(
    () => () => {
      dispatch(reset());
    },
    [],
  );

  useEffect(() => {
    dispatch(getTasksByProjectId(projectId));
  }, [projectId]);

  return tasks?.length ? (
    <Stack spacing={3}>
      {tasks.map(({ id, ...task }) => (
        <TasksListItem {...task} key={`task-${id}`} />
      ))}
    </Stack>
  ) : null;
};

export default TasksList;
