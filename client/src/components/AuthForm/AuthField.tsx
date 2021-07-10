import { TextField } from '@material-ui/core';
import { useField } from 'formik';

import { Field } from './AuthForm';

const AuthField: React.FC<Field> = ({ label, type, ...rest }) => {
  const [field, meta] = useField({ type, ...rest });

  return (
    <TextField
      label={label}
      type={type}
      error={!!(meta.touched && meta.error)}
      helperText={meta.touched ? meta.error : undefined}
      sx={{
        minHeight: 80,
      }}
      {...field}
    />
  );
};

export default AuthField;
