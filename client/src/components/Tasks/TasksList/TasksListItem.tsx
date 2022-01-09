import StageCard from '../../Card/StageCard';
import User from '../../../types/user';
import TaskStage from '../../../types/taskStage';

interface Props {
  title: string;
  createdAt: Date;
  creator?: User;
  stage?: TaskStage;
  disableClick?: boolean;
}

const TasksListItem: React.FC<Props> = (props) => {
  return <StageCard {...props} onClick={(): void => {}} />;
};

export default TasksListItem;
