import { wrapper } from '../../../../store';
import { getServerSidePropsWithAutologin } from '../../../../util/autologin';
import ROUTES from '../../../../constants/routes';
import ProjectPageContainer from '../../../../components/Projects/ProjectPageContainer';

const ProjectTasks: React.FC = () => {
  return <div>Tasks</div>;
};

ProjectTasks.getLayout = (page: React.ElementType) => (
  <ProjectPageContainer
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
