import React, { useState, useRef, useEffect } from 'react';
import {
  TextField,
  ClickAwayListener,
  TextFieldProps,
  useTheme,
} from '@mui/material';
import { Search } from '@mui/icons-material';

import { searchUsers } from '../../services/userServices';
import useDebouncing from '../../hooks/useDebouncing';
import useSearch from '../../hooks/useSearch';
import User from '../../types/user';
import SearchList from './SearchList';
import SearchItem from './types/SearchItem';
import SelectData from './types/SelectData';

interface Props extends Omit<TextFieldProps, 'onSelect'> {
  onSelect: (item: SearchItem) => void;
  useActiveState?: boolean;
  withIcon?: boolean;
}

const SearchInput: React.FC<Props> = ({
  onSelect,
  useActiveState,
  fullWidth,
  withIcon,
  ...rest
}) => {
  const [value, setValue] = useState('');
  const [isActive, setIsActive] = useState(false);
  const [showList, setShowList] = useState(false);
  const [width, setWidth] = useState<undefined | number>();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const theme = useTheme();
  const debounce = useDebouncing();
  const { handleSearch, values, error, loading } = useSearch<User[]>(
    searchUsers.bind(this, { value }),
  );

  useEffect(() => {
    const calculateWidth = (): void => {
      setWidth(inputRef.current?.offsetWidth);
    };

    window.addEventListener('resize', calculateWidth);

    return () => {
      window.removeEventListener('resize', calculateWidth);
    };
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setValue(e.target.value);
    debounce(500, handleSearch.bind(this, e.target.value));
  };

  const resetTimeout = (): void => {
    if (!timeoutRef.current) return;

    clearTimeout(timeoutRef.current);
    timeoutRef.current = null;
  };

  const handleOpenSearch = (): void => {
    if (isActive) return;

    resetTimeout();

    setIsActive(true);
    const timeout = setTimeout(() => {
      setShowList(true);
      setWidth(inputRef.current?.offsetWidth);
      timeoutRef.current = null;
    }, 200);

    timeoutRef.current = timeout;
  };

  const handleHideSearch = (): void => {
    if (!isActive) return;

    resetTimeout();

    setShowList(false);
    setIsActive(false);
    setWidth(undefined);
  };

  const handleSelect = ({ item, value: selectValue }: SelectData): void => {
    onSelect(item);
    setValue(selectValue);
  };

  return (
    <>
      <SearchList
        open={isActive}
        showList={showList && (!!values?.length || loading)}
        anchorEl={inputRef.current}
        placement="bottom"
        users={values}
        width={width && width - 16}
        onSelect={handleSelect}
        loading={loading}
      />
      <ClickAwayListener onClickAway={handleHideSearch}>
        <TextField
          {...rest}
          ref={inputRef}
          helperText={error || ''}
          error={!!error}
          InputProps={{
            startAdornment: withIcon ? <Search color="disabled" /> : null,
            ...rest.InputProps,
            sx: {
              boxShadow: isActive && useActiveState ? theme.shadows[6] : 'none',
              ...rest.InputProps?.sx,
            },
          }}
          sx={{
            width: useActiveState ? (isActive ? '40%' : '30%') : '100%',
            transition: 'all 0.2s ease',
            ...rest.sx,
          }}
          onChange={handleChange}
          onClick={handleOpenSearch}
          value={value}
        />
      </ClickAwayListener>
    </>
  );
};

export default SearchInput;
