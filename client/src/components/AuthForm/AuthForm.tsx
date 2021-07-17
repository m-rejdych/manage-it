import React from 'react';
import Link from 'next/link';
import { Stack, Button, Typography, useTheme } from '@material-ui/core';
import { Formik, Form } from 'formik';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';

import ROUTES from '../../constants/routes';
import AuthField from './AuthField';
import InputType from '../../types/InputType';
import validateInput from '../../util/validateInput';
import { login, register } from '../../store/ducks/auth/actions';

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

interface RegisterValues extends LoginValues {
  username: string;
  repeatPassword: string;
}

export interface Field {
  name: keyof RegisterValues;
  type: InputType;
  label: string;
  validate?: (value: string) => string | undefined;
}

const Register: React.FC = () => {
  const router = useRouter();
  const theme = useTheme();
  const dispatch = useDispatch();

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

  const loginFields: Field[] = [
    {
      name: 'email',
      type: 'email',
      label: 'Email address',
      validate: (value: string): string | undefined => {
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
        ? (value: string): string | undefined => {
            const error = validateInput(value, { regexp: PASSWORD_REGEXP })
              ? undefined
              : 'Passowrd should contain a digit and be at least 6 characters long.';

            return error;
          }
        : undefined,
    },
  ];

  const registerFields: Field[] = isRegister
    ? [
        {
          name: 'username',
          type: 'text',
          label: 'Username',
          validate: (value: string): string | undefined => {
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

  const fields = [...loginFields, ...registerFields];

  return (
    <Formik enableReinitialize initialValues={initialValues} onSubmit={handleSubmit}>
      {({ values }) => (
        <Form>
          <Stack spacing={1}>
            {fields.map(({ validate, ...field }) => (
              <AuthField
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
  );
};

export default Register;
