import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Box, Typography, Button } from '@mui/material';

import { wrapper } from '../../store';
import { getServerSidePropsWithAutologin } from '../../util/autologin';
import { getMyProjects, reset } from '../../store/ducks/projects/actions';
import ProjectsList from '../../components/Projects/ProjectsList';
import ROUTES from '../../constants/routes';

const Projects: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMyProjects());

    return () => {
      dispatch(reset());
    };
  }, []);

  return (
    <Box py={8}>
      <Box display="flex" alignItems="center" justifyContent="space-between" mb={3}>
        <Box>
          <Typography variant="h6">Projects</Typography>
          <Typography variant="body2" color="textSecondary">
            Here is the list of all your projects
          </Typography>
        </Box>
        <Button variant="contained">Create new project</Button>
      </Box>
      <ProjectsList />
    </Box>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  getServerSidePropsWithAutologin(true, ROUTES.LOGIN)
);

export default Projects;
