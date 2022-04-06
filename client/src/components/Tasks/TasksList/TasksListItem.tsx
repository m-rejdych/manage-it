import { useRouter } from 'next/router';

import StageCard from '../../Card/StageCard';
import User from '../../../types/user';
import TaskStage from '../../../types/taskStage';
import ROUTES from '../../../constants/routes';

interface Props {
  id: number;
  title: string;
  createdAt: Date;
  creator?: User;
  stage?: TaskStage;
  disableClick?: boolean;
}

const TasksListItem: React.FC<Props> = ({ id, ...props }) => {
  const router = useRouter();

  const handleClick = (): void => {
    router.push(`${ROUTES.PROJECTS}/${router.query.projectId}/tasks/${id}`);
  };

  return <StageCard {...props} onClick={handleClick} />;
};

export default TasksListItem;
