import { useRouter } from 'next/router';
import { Box } from '@mui/material';

import { wrapper } from '../../../../store';
import { getServerSidePropsWithAutologin } from '../../../../util/autologin';
import ROUTES from '../../../../constants/routes';
import ProjectPageContainer from '../../../../components/Projects/ProjectPageContainer';
import TasksList from '../../../../components/Tasks/TasksList';
import Role from '../../../../types/project/Role';

const ProjectTasks: React.FC = () => {
  const { query } = useRouter();

  return (
    <Box>
      <TasksList projectId={parseInt(query.projectId as string, 10)} />
    </Box>
  );
};

ProjectTasks.getLayout = (page: React.ElementType) => (
  <ProjectPageContainer
    role={Role.User}
    breadcrumbs={{
      current: 'Tasks',
      values: [
        {
          label: 'Project',
          href: `${ROUTES.PROJECTS}/${page._owner.pendingProps.router.query.projectId}`,
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

export default ProjectTasks;
