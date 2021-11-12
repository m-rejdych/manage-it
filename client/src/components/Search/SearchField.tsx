import React from 'react';
import { useField } from 'formik';

import SearchInput from './SearchInput';
import SearchItem from './types/SearchItem';
import Field from '../../types/FormField';

interface Props extends Omit<Field, 'validate'> {
  name: string;
  onChange: (item: SearchItem) => void;
  validate?: (value: string) => string | undefined;
}

const SearchField: React.FC<Props> = ({
  name,
  validate,
  type,
  onChange,
  ...rest
}) => {
  const [{ onChange: _, ...field }] = useField({ name, validate, type });

  return <SearchInput onSelect={onChange} {...rest} {...field} />;
};

export default SearchField;