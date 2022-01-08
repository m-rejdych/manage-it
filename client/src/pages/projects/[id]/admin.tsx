import { useSelector } from 'react-redux';
import { wrapper } from '../../../store';
import type { RootState } from '../../../store/types/state';
import { getServerSidePropsWithAutologin } from '../../../util/autologin';
import ROUTES from '../../../constants/routes';
import ProjectPageContainer from '../../../components/Projects/ProjectPageContainer';
import AdminPanel from '../../../components/Projects/AdminPanel';

const ProjectAdmin: React.FC = () => {
  const isAdmin = useSelector(
    (state: RootState) => state.project.openedProject.isAdmin,
  );

  return (
    <ProjectPageContainer>{isAdmin && <AdminPanel />}</ProjectPageContainer>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  getServerSidePropsWithAutologin(true, ROUTES.LOGIN),
);

export default ProjectAdmin;
