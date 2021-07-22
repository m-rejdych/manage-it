import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { Box } from '@material-ui/core';

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
      router.push(ROUTES.HOME);
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
            background:
              'radial-gradient(123.22% 129.67% at 100.89% -5.6%, #201D47 0%, #17153A 100%)',
          }}
        ></Box>
      )}
    </>
  );
};

export default AuthProvider;
