import { Box, Paper, useTheme } from '@material-ui/core';

import ROUTES from '../constants/routes';
import AuthForm from '../components/AuthForm';
import { wrapper } from '../store';
import { getServerSidePropsWithAutologin } from '../util/autologin';

const Login: React.FC = () => {
  const theme = useTheme();

  return (
    <Box height="100vh" display="flex" alignItems="center" justifyContent="center">
      <Paper sx={{ p: theme.spacing(3), minWidth: 470 }}>
        <AuthForm />
      </Paper>
    </Box>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  getServerSidePropsWithAutologin(false, ROUTES.HOME)
);

export default Login;
