import { useState } from 'react';
import { useRouter } from 'next/router';
import { Grid, Paper, Box, Stack, Typography, useTheme } from '@mui/material';
import { format } from 'date-fns';

import Project from '../../../types/project';
import ProjectStageName from '../../../types/projectStage/ProjectStageName';
import {
  PROJECT_STAGE_LABELS,
  PROJECT_STAGE_ICONS,
  PROJECT_STAGE_ICONS_COLORS,
} from '../constants';
import ROUTES from '../../../constants/routes';

const ProjectsListItem: React.FC<Project> = ({ id, title, createdAt, stage, creator }) => {
  const [isHovered, setIsHovered] = useState(false);
  const { push } = useRouter();
  const theme = useTheme();

  const getStageIcon = (name: ProjectStageName): JSX.Element => {
    const Icon = PROJECT_STAGE_ICONS[name];

    return <Icon htmlColor={PROJECT_STAGE_ICONS_COLORS[name]} fontSize="small" />;
  };

  const handleMouseEnter = (): void => {
    setIsHovered(true);
  };

  const handleMouseLeave = (): void => {
    setIsHovered(false);
  };

  const handleGoToProject = (): void => {
    push(`${ROUTES.PROJECTS}/${id}`);
  };

  return (
    <Grid item xs={6}>
      <Paper
        sx={{ p: theme.spacing(4), borderRadius: 5, cursor: 'pointer' }}
        elevation={isHovered ? 6 : 1}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleGoToProject}
      >
        <Box>
          <Box display="flex" alignItems="center" justifyContent="space-between">
            <Typography sx={{ fontWeight: 700 }}>{title}</Typography>
            {stage && (
              <Stack spacing={1} direction="row" alignItems="center">
                {getStageIcon(stage.name)}
                <Typography variant="body2">{PROJECT_STAGE_LABELS[stage.name]}</Typography>
              </Stack>
            )}
          </Box>
          <Typography variant="body2" color="textSecondary">{`Launched at ${format(
            new Date(createdAt),
            'MMM do, y'
          )}`}</Typography>
          <Typography variant="body2" color="textSecondary">
            {`by ${creator!.username}`}
          </Typography>
        </Box>
      </Paper>
    </Grid>
  );
};

export default ProjectsListItem;
