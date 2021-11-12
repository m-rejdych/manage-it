import React from 'react';
import { Done, WatchLater, Cached, NotStarted } from '@mui/icons-material';
import { green, yellow, deepPurple, teal } from '@mui/material/colors';

import ProjectStageName from '../../../types/projectStage/ProjectStageName';

export const PROJECT_STAGE_LABELS: Record<ProjectStageName, string> = {
  closed: 'Closed',
  open: 'Open',
  preparation: 'Preparation',
  progress: 'In progress',
};

export const PROJECT_STAGE_ICONS: Record<ProjectStageName, React.ElementType> = {
  closed: Done,
  open: NotStarted,
  preparation: WatchLater,
  progress: Cached,
};

export const PROJECT_STAGE_ICONS_COLORS: Record<ProjectStageName, string> = {
  closed: green[400],
  open: teal[400],
  progress: deepPurple[400],
  preparation: yellow[400],
};