import { TextField } from '@material-ui/core';
import { useField } from 'formik';

import Field from '../../types/FormField';

const FormField: React.FC<Field> = ({ label, type, name, multiline, ...rest }) => {
  const [field, meta] = useField({ type, name: name as string, ...rest });

  return (
    <TextField
      {...rest}
      {...field}
      label={label}
      type={type}
      multiline={multiline}
      error={!!(meta.touched && meta.error)}
      helperText={meta.touched ? meta.error : undefined}
      sx={{
        minHeight: multiline ? 170 : 80,
      }}
    />
  );
};

export default FormField;
