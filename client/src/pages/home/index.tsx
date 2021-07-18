import { GetServerSideProps } from 'next';
import { Typography, Box } from '@material-ui/core';

import autologin from '../../util/autologin';
import ROUTES from '../../constants/routes';

const Home: React.FC = () => {
  return (
    <Box minHeight="100vh" display="flex" alignItems="center" justifyContent="center">
      <Typography>Hello world!</Typography>
    </Box>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const initialState = await autologin(ctx);

  if (!initialState) {
    return { props: {}, redirect: { destination: ROUTES.LOGIN } };
  }

  return { props: { initialReduxState: initialState } };
};

export default Home;
