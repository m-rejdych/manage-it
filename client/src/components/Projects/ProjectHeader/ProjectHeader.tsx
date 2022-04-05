import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import { Stack, Button, Breadcrumbs } from '@mui/material';
import { Add, ExitToApp, Check, Close } from '@mui/icons-material';

import type { RootState } from '../../../store/types/state';
import type { BreadcrumbsType } from '../../PageHeader/PageHeader';
import {
  requestMembership,
  removeMemberRequest,
  reset,
  getProjectById,
  validateMembership,
} from '../../../store/ducks/projects/actions';
import PageHeader from '../../PageHeader';
import ROUTES from '../../../constants/routes';

type NavigateClosure = (pathname?: string) => () => void;

interface Props {
  id: number;
  title: string;
  toggleTaskDialog: () => void;
  breadcrumbs?: BreadcrumbsType;
}

const ProjectHeader: React.FC<Props> = ({
  id,
  title,
  toggleTaskDialog,
  breadcrumbs,
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
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(
    () => () => {
      dispatch(reset());
    },
    [],
  );

  useEffect(() => {
    dispatch(getProjectById(parseInt(router.query.projectId as string)));
    dispatch(validateMembership(parseInt(router.query.projectId as string)));
  }, [router.query.projectId]);

  const handleNavigate: NavigateClosure =
    (pathname = '') =>
    () => {
      router.push(`${ROUTES.PROJECTS}/${router.query.projectId}${pathname}`);
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
    <PageHeader
      title={title}
      renderButtons={renderButton}
      breadcrumbs={breadcrumbs}
    />
  );
};

export default ProjectHeader;
