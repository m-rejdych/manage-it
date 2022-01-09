import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import { Typography } from '@mui/material';

import ProjectPageContainer from '../../../../components/Projects/ProjectPageContainer';
import { getAdminMemberRequests } from '../../../../store/ducks/projects/actions';
import type { RootState } from '../../../../store/types/state';

const ProjectRequests: React.FC = () => {
  const isAdmin = useSelector(
    (state: RootState) => state.project.openedProject.isAdmin,
  );
  const { query } = useRouter();
  const dispatch = useDispatch();

  if (!isAdmin) return null;

  useEffect(() => {
    dispatch(getAdminMemberRequests(parseInt(query.id as string)));
  }, []);

  return <Typography>Requests</Typography>;
};

ProjectRequests.getLayout = (page: React.ReactElement): React.ReactNode => (
  <ProjectPageContainer>{page}</ProjectPageContainer>
);

export default ProjectRequests;
