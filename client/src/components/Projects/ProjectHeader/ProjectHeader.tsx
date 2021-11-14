import React from 'react';
import { useSelector } from 'react-redux';
import { Box, Typography, Button } from '@mui/material';
import { Add } from '@mui/icons-material';

import { RootState } from '../../../store/types/state';

interface Props {
  title: string;
  toggleTaskDialog: () => void;
}

const ProjectHeader: React.FC<Props> = ({ title, toggleTaskDialog }) => {
  const isMember = useSelector(
    (state: RootState) => state.project.openedProject.isMember,
  );

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      mb={3}
    >
      <Typography variant="h6">{title}</Typography>
      {isMember && (
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={toggleTaskDialog}
        >
          Add task
        </Button>
      )}
    </Box>
  );
};

export default ProjectHeader;
