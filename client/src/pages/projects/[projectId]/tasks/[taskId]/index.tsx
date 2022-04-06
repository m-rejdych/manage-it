import { wrapper } from '../../../../../store';
import { getServerSidePropsWithAutologin } from '../../../../../util/autologin';
import ROUTES from '../../../../../constants/routes';
import ProjectPageContainer from '../../../../../components/Projects/ProjectPageContainer';

const ProjectTask: React.FC = () => {
  return <div>Hello task!</div>;
};

ProjectTask.getLayout = (page: React.ElementType) => (
  <ProjectPageContainer
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
