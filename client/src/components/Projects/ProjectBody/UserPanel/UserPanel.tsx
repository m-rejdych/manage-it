import React from 'react';

import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { Stack, Typography, Box, Divider } from '@mui/material';

import type { RootState } from '../../../../store/types/state';
import TaskDialog from '../../../Tasks/TaskDialog';
import TasksList from '../../../Tasks/TasksList';

interface Props {
  taskDialogOpen: boolean;
  toggleDialog: () => void;
}

const UserPanel: React.FC<Props> = ({ taskDialogOpen, toggleDialog }) => {
  const project = useSelector(
    (state: RootState) => state.project.openedProject.project,
  );
  const isMember = useSelector(
    (state: RootState) => state.project.openedProject.isMember,
  );
  const { query } = useRouter();

  return (
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
      <TaskDialog
        open={taskDialogOpen}
        onClose={toggleDialog}
        projectId={parseInt(query.id as string)}
      />
    </>
  );
};

export default UserPanel;
