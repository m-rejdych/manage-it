import Card from '../../Card';
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
  return <Card {...props} onClick={(): void => {}} />;
};

export default TasksListItem;
