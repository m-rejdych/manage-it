import { GetServerSideProps } from 'next';
import { Box, Paper, useTheme } from '@material-ui/core';

import AuthForm from '../components/AuthForm';
import autologin from '../util/autologin';
import ROUTES from '../constants/routes';

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

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const initialState = await autologin(ctx);

  if (!initialState) {
    return { props: {} };
  }

  return { props: { initialReduxState: initialState }, redirect: { destination: ROUTES.HOME } };
};

export default Login;
