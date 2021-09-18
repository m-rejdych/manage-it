import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { Box } from '@mui/material';

import { RootState } from '../../store/types/state';
import ROUTES, { AUTH_ROUTES, NON_AUTH_ROUTES } from '../../constants/routes';

const AuthProvider: React.FC = ({ children }) => {
  const [initialLoad, setInitialLoad] = useState(false);
  const isAuth = useSelector((state: RootState) => state.auth.isAuth);
  const router = useRouter();

  useEffect(() => {
    if (!isAuth && AUTH_ROUTES.includes(router.pathname)) {
      router.push(ROUTES.LOGIN);
      return;
    }

    if (isAuth && NON_AUTH_ROUTES.includes(router.pathname)) {
      router.push(ROUTES.DASHBOARD);
      return;
    }

    setInitialLoad(true);
  }, [isAuth, router.pathname]);

  return (
    <>
      {initialLoad ? (
        children
      ) : (
        <Box
          sx={{
            height: '100vh',
            position: 'absolute',
          }}
        ></Box>
      )}
    </>
  );
};

export default AuthProvider;
