import { useSelector } from 'react-redux';
import { Grid } from '@mui/material';

import { RootState } from '../../../store/types/state';
import ProjectsListItem from './ProjectsListItem';

const ProjectsList: React.FC = () => {
  const projects = useSelector((state: RootState) => state.project.projects);

  return (
    <Grid container spacing={2}>
      {projects.map((project) => (
        <ProjectsListItem {...project} key={project.id} />
      ))}
    </Grid>
  );
};

export default ProjectsList;
