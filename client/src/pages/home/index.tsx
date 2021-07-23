import { GetServerSidePropsResult } from 'next';
import { useDispatch } from 'react-redux';
import { Typography, Box, Button, useTheme } from '@material-ui/core';

import { logout } from '../../store/ducks/auth/actions';
import { wrapper } from '../../store';
import { getServerSidePropsWithAutologin } from '../../util/autologin';
import ROUTES from '../../constants/routes';

const Home: React.FC = (props) => {
  const theme = useTheme();
  const dispatch = useDispatch();

  const handleLogout = (): void => {
    dispatch(logout());
  };

  return (
    <Box
      minHeight="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      position="relative"
    >
      <Typography>Hello world!</Typography>
      <Button
        sx={{ position: 'fixed', top: theme.spacing(3), right: theme.spacing(3) }}
        onClick={handleLogout}
      >
        Logout
      </Button>
    </Box>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  getServerSidePropsWithAutologin(true, ROUTES.LOGIN)
);

export default Home;
