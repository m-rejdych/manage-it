import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';

import { wrapper } from '../../../../../store';
import { getServerSidePropsWithAutologin } from '../../../../../util/autologin';
import { getTaskById, reset } from '../../../../../store/ducks/task/actions';
import ROUTES from '../../../../../constants/routes';
import ProjectPageContainer from '../../../../../components/Projects/ProjectPageContainer';
import Role from '../../../../../types/project/Role';
import type { RootState } from '../../../../../store/types/state';

const ProjectTask: React.FC = () => {
  const isMember = useSelector(
    (state: RootState) => state.project.openedProject.isMember,
  );
  const { query } = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isMember) {
      dispatch(
        getTaskById({
          taskId: parseInt(query.taskId as string),
          projectId: parseInt(query.projectId as string),
        }),
      );
    }

    return () => {
      dispatch(reset());
    };
  }, [isMember]);

  return <div>Hello task!</div>;
};

ProjectTask.getLayout = (page: React.ElementType) => (
  <ProjectPageContainer
    role={Role.User}
    breadcrumbs={{
      current: 'Task',
      values: [
        {
          label: 'Project',
          href: `${ROUTES.PROJECTS}/${page._owner.pendingProps.router.query.projectId}`,
        },
        {
          label: 'Tasks',
          href: `${ROUTES.PROJECTS}/${page._owner.pendingProps.router.query.projectId}/tasks`,
        },
      ],
    }}
  >
    {page}
  </ProjectPageContainer>
);

export const getServerSideProps = wrapper.getServerSideProps(
  getServerSidePropsWithAutologin(true, ROUTES.LOGIN),
);

export default ProjectTask;
