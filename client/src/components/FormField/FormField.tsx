import { TextField, MenuItem } from '@mui/material';
import { useField } from 'formik';

import Field from '../../types/FormField';

const FormField: React.FC<Field> = ({
  label,
  type,
  name,
  validate,
  multiline,
  rows,
  disabled,
  fullWidth,
  sx,
  select,
  options,
  InputProps,
  placeholder,
  shouldValidate = true,
  ...rest
}) => {
  const [field, { error, touched }] = useField({
    type,
    name: name as string,
    validate: shouldValidate ? validate : () => undefined,
    ...rest,
  });

  return (
    <TextField
      {...field}
      label={label}
      placeholder={placeholder}
      type={type}
      multiline={multiline}
      rows={rows}
      disabled={disabled}
      fullWidth={fullWidth}
      error={!!(touched && error)}
      helperText={touched ? error : ''}
      select={select}
      sx={{
        minHeight: multiline ? 170 : 80,
        ...sx,
      }}
      InputProps={InputProps}
    >
      {select &&
        options?.map(({ value, label }) => (
          <MenuItem key={`${label}-${value}`} value={value}>
            {label}
          </MenuItem>
        ))}
    </TextField>
  );
};

export default FormField;
