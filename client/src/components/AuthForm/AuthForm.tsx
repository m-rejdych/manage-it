import { useEffect } from 'react';
import Link from 'next/link';
import { Stack, Button, Typography, useTheme } from '@material-ui/core';
import { Formik, Form } from 'formik';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';

import ROUTES from '../../constants/routes';
import FormField from '../FormField';
import Field from '../../types/FormField';
import AppAlert from '../../components/AppAlert';
import validateInput from '../../util/validateInput';
import { RootState } from '../../store/types/state';
import { login, register, setError } from '../../store/ducks/auth/actions';

const EMAIL_REGEXP =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const PASSWORD_REGEXP = /^(?=.*\d).{6,}$/;

const handleValidateRepeatPassword = (value: string, passwordValue: string): string | undefined => {
  const error = value === passwordValue ? undefined : 'Passwords does not match.';

  return error;
};

interface LoginValues {
  email: string;
  password: string;
}

export interface RegisterValues extends LoginValues {
  username: string;
  repeatPassword: string;
}

const Register: React.FC = () => {
  const isAuth = useSelector((state: RootState) => state.auth.isAuth);
  const error = useSelector((state: RootState) => state.auth.error);
  const router = useRouter();
  const theme = useTheme();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isAuth) router.push(ROUTES.DASHBOARD);
  }, [isAuth]);

  const isRegister = router.pathname === ROUTES.REGISTER;

  const initialValues: LoginValues | RegisterValues = isRegister
    ? {
        email: '',
        username: '',
        password: '',
        repeatPassword: '',
      }
    : {
        email: '',
        password: '',
      };

  const loginFields: Field<LoginValues>[] = [
    {
      name: 'email',
      type: 'email',
      label: 'Email address',
      validate: (value) => {
        const error = validateInput(value, { regexp: EMAIL_REGEXP })
          ? undefined
          : 'Enter a valid email address.';

        return error;
      },
    },
    {
      name: 'password',
      type: 'password',
      label: 'Password',
      validate: isRegister
        ? (value) => {
            const error = validateInput(value, { regexp: PASSWORD_REGEXP })
              ? undefined
              : 'Passowrd should contain a digit and be at least 6 characters long.';

            return error;
          }
        : undefined,
    },
  ];

  const registerFields: Field<RegisterValues>[] = isRegister
    ? [
        {
          name: 'username',
          type: 'text',
          label: 'Username',
          validate: (value) => {
            const error = validateInput(value, { length: 2 })
              ? undefined
              : 'Username should be at least 2 characters long.';

            return error;
          },
        },
        {
          name: 'repeatPassword',
          type: 'password',
          label: 'Repeat password',
        },
      ]
    : [];

  const handleSubmit = (values: LoginValues | RegisterValues): void => {
    dispatch(isRegister ? register(values as RegisterValues) : login(values as LoginValues));
  };

  const handleCloseAlert = (): void => {
    dispatch(setError(null));
  };

  const fields = [...loginFields, ...registerFields];

  return (
    <>
      <Formik enableReinitialize initialValues={initialValues} onSubmit={handleSubmit}>
        {({ values }) => (
          <Form>
            <Stack spacing={1}>
              {fields.map(({ validate, ...field }) => (
                <FormField
                  key={field.name}
                  validate={
                    !validate && field.name === 'repeatPassword'
                      ? () =>
                          handleValidateRepeatPassword(
                            values.password,
                            (values as RegisterValues).repeatPassword
                          )
                      : validate
                  }
                  {...field}
                />
              ))}
              <Button sx={{ alignSelf: 'center' }} type="submit">
                {isRegister ? 'Register' : 'Login'}
              </Button>
              <Typography variant="caption" sx={{ alignSelf: 'center' }}>
                {isRegister ? 'Already have an account? ' : "Don't have an account? "}
                <Link href={isRegister ? ROUTES.LOGIN : ROUTES.REGISTER}>
                  <a style={{ color: theme.palette.secondary.main }}>
                    {isRegister ? 'Login' : 'Register'}
                  </a>
                </Link>
              </Typography>
            </Stack>
          </Form>
        )}
      </Formik>
      <AppAlert open={!!error} severity="error" onClose={handleCloseAlert}>
        {error}
      </AppAlert>
    </>
  );
};

export default Register;
