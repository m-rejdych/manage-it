import { wrapper } from '../../../store';
import { getServerSidePropsWithAutologin } from '../../../util/autologin';
import ROUTES from '../../../constants/routes';
import ProjectPageContainer from '../../../components/Projects/ProjectPageContainer';
import UserPanel from '../../../components/Projects/UserPanel';

const Project: React.FC = () => (
  <ProjectPageContainer>
    <UserPanel />
  </ProjectPageContainer>
);

export const getServerSideProps = wrapper.getServerSideProps(
  getServerSidePropsWithAutologin(true, ROUTES.LOGIN),
);

export default Project;
