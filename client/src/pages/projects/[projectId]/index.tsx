import { useSelector } from 'react-redux';
import { Stack, Typography, Box, Divider } from '@mui/material';
import { NextPage } from 'next';

import { wrapper } from '../../../store';
import { getServerSidePropsWithAutologin } from '../../../util/autologin';
import type { RootState } from '../../../store/types/state';
import ProjectPageContainer from '../../../components/Projects/ProjectPageContainer';
import TasksList from '../../../components/Tasks/TasksList';
import ROUTES from '../../../constants/routes';

const Project: React.FC = () => {
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

Project.getLayout = (page: React.ReactElement): React.ReactNode => (
  <ProjectPageContainer>{page}</ProjectPageContainer>
);

export const getServerSideProps = wrapper.getServerSideProps(
  getServerSidePropsWithAutologin(true, ROUTES.LOGIN),
);

export default Project;
