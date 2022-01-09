import { Box, Stack, Typography } from '@mui/material';
import { format } from 'date-fns';

import CardBase from './CardBase';
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
  disableClick?: boolean;
}

const StageCard: React.FC<Props> = ({
  stage,
  title,
  createdAt,
  creator,
  onClick,
  disableClick,
}) => {
  const getStageIcon = (
    name: ProjectStageName | TaskStageName,
  ): JSX.Element => {
    const Icon = STAGE_ICONS[name];

    return <Icon htmlColor={STAGE_ICONS_COLORS[name]} fontSize="small" />;
  };

  return (
    <CardBase onClick={onClick} disableClick={disableClick}>
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
        <Typography variant="body2" color="textSecondary">{`Created at ${format(
          new Date(createdAt),
          'MMM do, y',
        )}`}</Typography>
        <Typography variant="body2" color="textSecondary">
          {`by ${creator!.username}`}
        </Typography>
      </Box>
    </CardBase>
  );
};

export default StageCard;
