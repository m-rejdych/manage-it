import { TextField } from '@material-ui/core';
import { useField } from 'formik';

import Field from '../../types/FormField';

const FormField: React.FC<Field> = ({ label, type, name, ...rest }) => {
  const [field, meta] = useField({ type, name: name as string, ...rest });

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

export default FormField;
