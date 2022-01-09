import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import { Box, Stack, Typography, Button } from '@mui/material';
import { Add, ExitToApp, Check, Close } from '@mui/icons-material';

import { RootState } from '../../../store/types/state';
import {
  requestMembership,
  removeMemberRequest,
  reset,
  getProjectById,
  validateMembership,
} from '../../../store/ducks/projects/actions';
import ROUTES from '../../../constants/routes';

type NavigateClosure = (pathname?: string) => () => void;

interface Props {
  id: number;
  title: string;
  toggleTaskDialog: () => void;
}

const ProjectHeader: React.FC<Props> = ({ id, title, toggleTaskDialog }) => {
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
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(
    () => () => {
      dispatch(reset());
    },
    [],
  );

  useEffect(() => {
    dispatch(getProjectById(parseInt(router.query.id as string)));
    dispatch(validateMembership(parseInt(router.query.id as string)));
  }, [router.query.id]);

  const handleNavigate: NavigateClosure =
    (pathname = '') =>
    () => {
      router.push(`${ROUTES.PROJECTS}/${router.query.id}${pathname}`);
    };

  const handleRequestMembership = (): void => {
    dispatch(requestMembership(id));
  };

  const handleCancelRequest = (): void => {
    if (!memberRequest) return;
    dispatch(removeMemberRequest(memberRequest.id));
  };

  const renderButton = (): JSX.Element => {
    if (isMember) {
      const taskButton = (
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={toggleTaskDialog}
        >
          Add task
        </Button>
      );

      if (isAdmin) {
        if (router.pathname.includes('admin')) {
          return (
            <Stack direction="row" spacing={2}>
              <Button onClick={handleNavigate()}>User panel</Button>
              {taskButton}
            </Stack>
          );
        }

        return (
          <Stack direction="row" spacing={2}>
            <Button color="secondary" onClick={handleNavigate('/admin')}>
              Admin panel
            </Button>
            {taskButton}
          </Stack>
        );
      }

      return taskButton;
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
