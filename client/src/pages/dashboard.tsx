import { wrapper } from '../store';
import { getServerSidePropsWithAutologin } from '../util/autologin';

import ROUTES from '../constants/routes';
import WelcomeSection from '../components/Dashboard/WelcomeSection';

const Home: React.FC = () => {
  return <WelcomeSection />;
};

export const getServerSideProps = wrapper.getServerSideProps(
  getServerSidePropsWithAutologin(true, ROUTES.LOGIN)
);

export default Home;
