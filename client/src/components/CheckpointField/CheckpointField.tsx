import { useState } from 'react';
import { useField } from 'formik';
import {
  Stack,
  TextField,
  IconButton,
  OutlinedTextFieldProps,
  StackProps,
} from '@mui/material';
import { Add } from '@mui/icons-material';

import CheckpointList from '../CheckpointList';

interface Props
  extends Omit<OutlinedTextFieldProps, 'value' | 'onChange' | 'variant'> {
  onChange: (checkpoints: string[]) => void;
  name: string;
  validate?: (values: string[]) => string | undefined;
  containerProps?: StackProps;
}

const CheckpointField: React.FC<Props> = ({
  name,
  validate,
  onChange,
  fullWidth,
  placeholder,
  containerProps,
  ...rest
}) => {
  const [textValue, setTextValue] = useState('');
  const [{ value }, { error, touched }] = useField({ name, validate });

  const handleChangeTextValue = (
    e: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    setTextValue(e.target.value);
  };

  const handleAddCheckpoint = (): void => {
    if (!textValue.trim() || value.includes(textValue.trim())) return;

    onChange([textValue, ...value]);
    setTextValue('');
  };

  const handleDeleteCheckpoint = (deletedValue: string): void => {
    onChange(
      (value as string[]).filter((checkpoint) => checkpoint !== deletedValue),
    );
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key !== 'Enter') return;

    handleAddCheckpoint();
  };

  return (
    <Stack width={fullWidth ? '100%' : 'auto'} spacing={2} {...containerProps}>
      <TextField
        {...rest}
        placeholder={placeholder || 'Enter checkpoint name...'}
        fullWidth={fullWidth}
        value={textValue}
        error={!!(touched && error)}
        helperText={touched ? error : ''}
        onChange={handleChangeTextValue}
        onKeyPress={handleKeyPress}
        InputProps={{
          ...rest.InputProps,
          endAdornment: (
            <IconButton onClick={handleAddCheckpoint}>
              <Add />
            </IconButton>
          ),
        }}
      />
      {!!value.length && (
        <CheckpointList value={value} onDelete={handleDeleteCheckpoint} />
      )}
    </Stack>
  );
};

export default CheckpointField;
