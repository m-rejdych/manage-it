import React, { useState, useRef, useEffect } from 'react';
import { TextField, ClickAwayListener, useTheme } from '@mui/material';
import { Search } from '@mui/icons-material';

import { searchUsers } from '../../services/userServices';
import useDebouncing from '../../hooks/useDebouncing';
import useSearch from '../../hooks/useSearch';
import User from '../../types/user';
import SearchList from './SearchList';
import SearchItem from './types/SearchItem';

interface Props {
  onSelect: (item: SearchItem) => void;
}

const SearchInput: React.FC<Props> = ({ onSelect }) => {
  const [value, setValue] = useState('');
  const [isActive, setIsActive] = useState(false);
  const [showList, setShowList] = useState(false);
  const [width, setWidth] = useState<undefined | number>();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const theme = useTheme();
  const debounce = useDebouncing();
  const { handleSearch, values, error, loading } = useSearch<User[]>(
    searchUsers.bind(this, { value })
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

  return (
    <>
      <SearchList
        open={isActive}
        showList={showList && (!!values?.length || loading)}
        anchorEl={inputRef.current}
        placement="bottom"
        users={values}
        width={width && width - 16}
        onSelect={onSelect}
        loading={loading}
      />
      <ClickAwayListener onClickAway={handleHideSearch}>
        <TextField
          ref={inputRef}
          placeholder="Search..."
          value={value}
          size="small"
          onChange={handleChange}
          onClick={handleOpenSearch}
          helperText={error || ''}
          error={!!error}
          InputProps={{
            startAdornment: <Search color="disabled" />,
            sx: { boxShadow: isActive ? theme.shadows[6] : 'none', borderRadius: 3 },
          }}
          sx={{ width: isActive ? '40%' : '30%', transition: 'all 0.2s ease' }}
        />
      </ClickAwayListener>
    </>
  );
};

export default SearchInput;
