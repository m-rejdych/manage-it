import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Stack } from '@mui/material';

import TasksListItem from './TasksListItem';
import { getTasksByProjectId, reset } from '../../../store/ducks/task/actions';
import { RootState } from '../../../store/types/state';

interface Props {
  projectId: number;
  disableClick?: boolean;
}

const TasksList: React.FC<Props> = ({ projectId, disableClick }) => {
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
        <TasksListItem
          {...task}
          disableClick={disableClick}
          key={`task-${id}`}
        />
      ))}
    </Stack>
  ) : null;
};

export default TasksList;
