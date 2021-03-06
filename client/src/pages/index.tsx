import { Box, Paper, Typography, Button, useTheme } from '@mui/material';
import { useRouter } from 'next/router';

import ROUTES from '../constants/routes';
import ValueOf from '../types/ValueOf';
import { wrapper } from '../store';
import { getServerSidePropsWithAutologin } from '../util/autologin';

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

export const getServerSideProps = wrapper.getServerSideProps(
  getServerSidePropsWithAutologin(false, ROUTES.DASHBOARD)
);

export default Home;
