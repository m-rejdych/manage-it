import { GetServerSideProps } from 'next';
import { Box, Paper, Typography, Button, useTheme } from '@material-ui/core';
import { useRouter } from 'next/router';

import ROUTES from '../constants/routes';
import ValueOf from '../types/ValueOf';
import autologin from '../util/autologin';

const Home: React.FC = () => {
  const theme = useTheme();
  const router = useRouter();

  const handleAuth = (route: ValueOf<typeof ROUTES>) => {
    router.push(route);
  };

  return (
    <Box height="100vh" display="flex" alignItems="center" justifyContent="center">
      <Paper
        sx={{
          padding: theme.spacing(3),
        }}
      >
        <Typography variant="h5" paragraph>
          Create a free account and work on exciting projects with other people!
        </Typography>
        <Box display="flex" alignItems="center" justifyContent="center">
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={(): void => handleAuth(ROUTES.REGISTER)}
            sx={{
              marginRight: theme.spacing(2),
            }}
          >
            Register
          </Button>
          <Button
            variant="contained"
            color="secondary"
            size="large"
            onClick={(): void => handleAuth(ROUTES.LOGIN)}
          >
            Login
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const initialState = await autologin(ctx);

  if (!initialState) {
    return { redirect: { destination: ROUTES.LOGIN }, props: {} };
  }

  return { props: { initialReduxState: initialState }, redirect: { destination: ROUTES.HOME } };
};

export default Home;
