import InputType from './InputType';

export default interface Field<T = { [key: string]: string }> {
  name: keyof T;
  type: InputType;
  label: string;
  validate?: (value: string) => string | undefined;
}
