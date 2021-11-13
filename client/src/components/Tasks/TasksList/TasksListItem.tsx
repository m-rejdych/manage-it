import React from 'react';

import Card from '../../Card';
import User from '../../../types/user';
import TaskStage from '../../../types/taskStage';

interface Props {
  title: string;
  createdAt: Date;
  creator?: User;
  stage?: TaskStage;
}

const TasksListItem: React.FC<Props> = (props) => {
  return <Card {...props} onClick={(): void => {}} />;
};

export default TasksListItem;
