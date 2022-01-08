import { useSelector } from 'react-redux';
import { Stack, Typography, Box, Divider } from '@mui/material';

import type { RootState } from '../../../store/types/state';
import TasksList from '../../Tasks/TasksList';

const UserPanel: React.FC = () => {
  const project = useSelector(
    (state: RootState) => state.project.openedProject.project,
  );
  const isMember = useSelector(
    (state: RootState) => state.project.openedProject.isMember,
  );

  return project ? (
    <>
      <Stack
        direction="row"
        spacing={3}
        divider={<Divider orientation="vertical" flexItem />}
      >
        <Stack spacing={3} flex={1}>
          <Typography color="textSecondary">Tasks</Typography>
          <TasksList disableClick={!isMember} projectId={project.id} />
        </Stack>
        <Box flex={1}>
          <Typography>Section</Typography>
        </Box>
      </Stack>
    </>
  ) : null;
};

export default UserPanel;
