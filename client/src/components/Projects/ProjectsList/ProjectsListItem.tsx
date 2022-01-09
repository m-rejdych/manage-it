import { useRouter } from 'next/router';
import { Grid } from '@mui/material';

import Project from '../../../types/project';
import ROUTES from '../../../constants/routes';
import StageCard from '../../Card/StageCard';

const ProjectsListItem: React.FC<Project> = ({
  id,
  title,
  createdAt,
  stage,
  creator,
}) => {
  const { push } = useRouter();

  const handleClick = (): void => {
    push(`${ROUTES.PROJECTS}/${id}`);
  };

  return (
    <Grid item xs={6}>
      <StageCard
        title={title}
        stage={stage}
        createdAt={createdAt}
        creator={creator}
        onClick={handleClick}
      />
    </Grid>
  );
};

export default ProjectsListItem;
