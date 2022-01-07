import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box, Stack, Typography, Button } from '@mui/material';
import { Add, ExitToApp, Check, Close } from '@mui/icons-material';

import { RootState } from '../../../store/types/state';
import {
  requestMembership,
  removeMemberRequest,
} from '../../../store/ducks/projects/actions';

interface Props {
  id: number;
  title: string;
  toggleTaskDialog: () => void;
  toggleAdminPanel: () => void;
  isAdminPanelActive: boolean;
}

const ProjectHeader: React.FC<Props> = ({
  id,
  title,
  toggleTaskDialog,
  toggleAdminPanel,
  isAdminPanelActive,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const isMember = useSelector(
    (state: RootState) => state.project.openedProject.isMember,
  );
  const isAdmin = useSelector(
    (state: RootState) => state.project.openedProject.isAdmin,
  );
  const memberRequest = useSelector(
    (state: RootState) => state.project.openedProject.memberRequest,
  );
  const dispatch = useDispatch();

  const handleRequestMembership = (): void => {
    dispatch(requestMembership(id));
  };

  const handleCancelRequest = (): void => {
    if (!memberRequest) return;
    dispatch(removeMemberRequest(memberRequest.id));
  };

  const renderButton = (): JSX.Element => {
    if (isMember) {
      return (
        <Stack spacing={2} direction="row">
          {isAdmin && (
            <Button color="secondary" onClick={toggleAdminPanel}>
              {`${isAdminPanelActive ? 'User' : 'Admin'}`} panel
            </Button>
          )}
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={toggleTaskDialog}
          >
            Add task
          </Button>
        </Stack>
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
          onClick={handleCancelRequest}
        >
          {isHovered ? 'Cancel request' : 'Request sent'}
        </Button>
      );
    }

    return (
      <Button
        variant="contained"
        startIcon={<ExitToApp />}
        onClick={handleRequestMembership}
      >
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
