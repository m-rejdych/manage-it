import { Typography, Box } from '@material-ui/core';

import { wrapper } from '../../store';
import { getServerSidePropsWithAutologin } from '../../util/autologin';
import ROUTES from '../../constants/routes';

const Home: React.FC = (props) => (
  <Box
    minHeight="100vh"
    display="flex"
    alignItems="center"
    justifyContent="center"
    position="relative"
  >
    <Typography>Hello world!</Typography>
  </Box>
);

export const getServerSideProps = wrapper.getServerSideProps(
  getServerSidePropsWithAutologin(true, ROUTES.LOGIN)
);

export default Home;
