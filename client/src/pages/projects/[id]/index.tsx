import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Stack, Divider, Typography } from '@mui/material';
import { useRouter } from 'next/router';

import { wrapper } from '../../../store';
import { getServerSidePropsWithAutologin } from '../../../util/autologin';
import {
  getProjectById,
  validateMembership,
  reset,
} from '../../../store/ducks/projects/actions';
import { RootState } from '../../../store/types/state';
import ROUTES from '../../../constants/routes';
import PageContainer from '../../../components/PageContainer';
import TaskDialog from '../../../components/Tasks/TaskDialog';
import TasksList from '../../../components/Tasks/TasksList';
import ProjectHeader from '../../../components/Projects/ProjectHeader';

const Project: React.FC = () => {
  const [open, setOpen] = useState(false);
  const { query } = useRouter();
  const project = useSelector(
    (state: RootState) => state.project.openedProject.project,
  );
  const isMember = useSelector(
    (state: RootState) => state.project.openedProject.isMember,
  );
  const dispatch = useDispatch();

  useEffect(
    () => () => {
      dispatch(reset());
    },
    [],
  );

  useEffect(() => {
    dispatch(getProjectById(parseInt(query.id as string)));
    dispatch(validateMembership(parseInt(query.id as string)));
  }, [query.id]);

  const toggleDialog = (): void => {
    setOpen((isOpen) => !isOpen);
  };

  return (
    project && (
      <PageContainer>
        <ProjectHeader
          id={project.id}
          title={project.title}
          toggleTaskDialog={toggleDialog}
        />
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
          open={open}
          onClose={toggleDialog}
          projectId={parseInt(query.id as string)}
        />
      </PageContainer>
    )
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  getServerSidePropsWithAutologin(true, ROUTES.LOGIN),
);

export default Project;
