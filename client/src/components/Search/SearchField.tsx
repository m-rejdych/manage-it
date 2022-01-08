import { useField } from 'formik';

import SearchInput from './SearchInput';
import SearchItem from './types/SearchItem';
import { SearchItemType } from './types/SearchItem';
import Field from '../../types/FormField';

interface Props extends Omit<Field, 'validate'> {
  name: string;
  onChange: (item: SearchItem | null) => void;
  validate?: (value: string) => string | undefined;
  useActiveState?: boolean;
  clearAfterSelect?: boolean;
  projectIdFilter?: number;
  search: SearchItemType[];
}

const SearchField: React.FC<Props> = ({
  name,
  validate,
  type,
  onChange,
  useActiveState,
  clearAfterSelect,
  projectIdFilter,
  search,
  ...rest
}) => {
  const [{ onChange: _, ...field }] = useField({ name, validate, type });

  return (
    <SearchInput
      onSelect={onChange}
      useActiveState={useActiveState}
      clearAfterSelect={clearAfterSelect}
      projectIdFilter={projectIdFilter}
      search={search}
      {...rest}
      {...field}
    />
  );
};

export default SearchField;
