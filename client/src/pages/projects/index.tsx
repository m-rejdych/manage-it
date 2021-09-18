import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Box } from '@mui/material';

import { getMyProjects, reset } from '../../store/ducks/projects/actions';

const Projects: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMyProjects());

    return () => {
      dispatch(reset());
    };
  }, []);

  return <Box>Projects</Box>;
};

export default Projects;
