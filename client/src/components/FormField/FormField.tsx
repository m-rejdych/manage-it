import { TextField, textFieldClasses } from '@material-ui/core';
import { useField } from 'formik';

import Field from '../../types/FormField';

const FormField: React.FC<Field> = ({
  label,
  type,
  name,
  multiline,
  rows,
  disabled,
  fullWidth,
  sx,
  ...rest
}) => {
  const [field, meta] = useField({ type, name: name as string, ...rest });

  return (
    <TextField
      {...field}
      label={label}
      type={type}
      multiline={multiline}
      rows={rows}
      disabled={disabled}
      fullWidth={fullWidth}
      error={!!(meta.touched && meta.error)}
      helperText={meta.touched ? meta.error : undefined}
      sx={{
        minHeight: multiline ? 170 : 80,
        ...sx,
      }}
    />
  );
};

export default FormField;
