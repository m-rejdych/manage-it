import { useSelector } from 'react-redux';
import { Typography } from '@mui/material';

import ProjectPageContainer from '../../../../components/Projects/ProjectPageContainer';
import type { RootState } from '../../../../store/types/state';

const ProjectRequests: React.FC = () => {
  const isAdmin = useSelector(
    (state: RootState) => state.project.openedProject.isAdmin,
  );

  if (!isAdmin) return null;

  return <Typography>Requests</Typography>;
};

ProjectRequests.getLayout = (page: React.ReactElement): React.ReactNode => (
  <ProjectPageContainer>{page}</ProjectPageContainer>
);

export default ProjectRequests;
