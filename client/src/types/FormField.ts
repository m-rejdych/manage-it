import InputType from './InputType';

export default interface Field<T = { [key: string]: string }> {
  name: keyof T;
  type: InputType;
  label: string;
  validate?: (value: string) => string | undefined;
  multiline?: boolean;
  rows?: number;
  disabled?: boolean;
  fullWidth?: boolean;
  sx?: object;
}
