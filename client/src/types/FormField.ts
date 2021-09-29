import { InputProps, SelectProps } from '@mui/material';

import InputType from './InputType';

interface Option {
  value: string;
  label: string;
  icon?: JSX.Element;
}

export default interface Field<T = { [key: string]: string }> {
  name: keyof T;
  type?: InputType;
  label?: string;
  placeholder?: string;
  validate?: (value: string | string[]) => string | undefined;
  multiline?: boolean;
  rows?: number;
  disabled?: boolean;
  fullWidth?: boolean;
  sx?: object;
  select?: boolean;
  options?: Option[];
  InputProps?: InputProps;
  SelectProps?: SelectProps;
  shouldValidate?: boolean;
}
