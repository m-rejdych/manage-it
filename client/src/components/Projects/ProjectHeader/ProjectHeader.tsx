import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Box, Typography, Button } from '@mui/material';
import { Add, ExitToApp, Check, Close } from '@mui/icons-material';

import { RootState } from '../../../store/types/state';

interface Props {
  title: string;
  toggleTaskDialog: () => void;
}

const ProjectHeader: React.FC<Props> = ({ title, toggleTaskDialog }) => {
  const [isHovered, setIsHovered] = useState(false);
  const isMember = useSelector(
    (state: RootState) => state.project.openedProject.isMember,
  );
  const memberRequest = useSelector(
    (state: RootState) => state.project.openedProject.memberRequest,
  );

  const renderButton = (): JSX.Element => {
    if (isMember) {
      return (
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={toggleTaskDialog}
        >
          Add task
        </Button>
      );
    }

    if (memberRequest) {
      return (
        <Button
          variant="contained"
          color={isHovered ? 'secondary' : 'primary'}
          startIcon={isHovered ? <Close /> : <Check />}
          onMouseEnter={(): void => setIsHovered(true)}
          onMouseLeave={(): void => setIsHovered(false)}
        >
          {isHovered ? 'Cancel request' : 'Request sent'}
        </Button>
      );
    }

    return (
      <Button variant="contained" startIcon={<ExitToApp />}>
        Join project
      </Button>
    );
  };

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      mb={3}
    >
      <Typography variant="h6">{title}</Typography>
      {renderButton()}
    </Box>
  );
};

export default ProjectHeader;
