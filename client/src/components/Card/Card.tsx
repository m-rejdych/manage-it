import React, { useState } from 'react';
import { Paper, Box, Stack, Typography, useTheme } from '@mui/material';
import { format } from 'date-fns';

import User from '../../types/user';
import ProjectStage from '../../types/projectStage';
import TaskStage from '../../types/taskStage';
import ProjectStageName from '../../types/projectStage/ProjectStageName';
import TaskStageName from '../../types/taskStage/taskStageName';
import {
  STAGE_ICONS,
  STAGE_LABELS,
  STAGE_ICONS_COLORS,
} from '../../constants/stages';

interface Props {
  title: string;
  createdAt: Date;
  creator?: User;
  stage?: TaskStage | ProjectStage;
  onClick: () => void;
}

const Card: React.FC<Props> = ({
  stage,
  title,
  createdAt,
  creator,
  onClick,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const theme = useTheme();

  const getStageIcon = (
    name: ProjectStageName | TaskStageName,
  ): JSX.Element => {
    const Icon = STAGE_ICONS[name];

    return <Icon htmlColor={STAGE_ICONS_COLORS[name]} fontSize="small" />;
  };

  const handleMouseEnter = (): void => {
    setIsHovered(true);
  };

  const handleMouseLeave = (): void => {
    setIsHovered(false);
  };

  return (
    <Paper
      sx={{ p: theme.spacing(4), borderRadius: 5, cursor: 'pointer' }}
      elevation={isHovered ? 6 : 1}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
    >
      <Box>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Typography sx={{ fontWeight: 700 }}>{title}</Typography>
          {stage && (
            <Stack spacing={1} direction="row" alignItems="center">
              {getStageIcon(stage.name)}
              <Typography variant="body2">
                {STAGE_LABELS[stage.name]}
              </Typography>
            </Stack>
          )}
        </Box>
        <Typography
          variant="body2"
          color="textSecondary"
        >{`Launched at ${format(
          new Date(createdAt),
          'MMM do, y',
        )}`}</Typography>
        <Typography variant="body2" color="textSecondary">
          {`by ${creator!.username}`}
        </Typography>
      </Box>
    </Paper>
  );
};

export default Card;
