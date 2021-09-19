import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Box, Typography, Button } from '@mui/material';
import { Add } from '@mui/icons-material';

import { wrapper } from '../../store';
import { getServerSidePropsWithAutologin } from '../../util/autologin';
import { getMyProjects, reset } from '../../store/ducks/projects/actions';
import PageContainer from '../../components/PageContainer';
import ProjectsList from '../../components/Projects/ProjectsList';
import ProjectDialog from '../../components/Projects/ProjectDialog';
import ROUTES from '../../constants/routes';

const Projects: React.FC = () => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMyProjects());

    return () => {
      dispatch(reset());
    };
  }, []);

  const toggleDialog = (): void => {
    setOpen((isOpen) => !isOpen);
  };

  return (
    <PageContainer>
      <Box display="flex" alignItems="center" justifyContent="space-between" mb={3}>
        <Box>
          <Typography variant="h6">Projects</Typography>
          <Typography variant="body2" color="textSecondary">
            Here is the list of all your projects
          </Typography>
        </Box>
        <Button variant="contained" onClick={toggleDialog} startIcon={<Add />}>
          Create new project
        </Button>
      </Box>
      <ProjectsList />
      <ProjectDialog open={open} onClose={toggleDialog} />
    </PageContainer>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  getServerSidePropsWithAutologin(true, ROUTES.LOGIN)
);

export default Projects;
