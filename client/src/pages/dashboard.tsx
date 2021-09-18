import { Box } from '@material-ui/core';

import { wrapper } from '../store';
import { getServerSidePropsWithAutologin } from '../util/autologin';
import ROUTES from '../constants/routes';
import WelcomeSection from '../components/Dashboard/WelcomeSection';
import SearchInput from '../components/Dashboard/SearchInput';

const Dashboard: React.FC = () => {
  return (
    <Box py={3}>
      <SearchInput />
      <WelcomeSection />
    </Box>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  getServerSidePropsWithAutologin(true, ROUTES.LOGIN)
);

export default Dashboard;
