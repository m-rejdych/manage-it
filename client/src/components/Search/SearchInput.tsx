import React, { useState, useRef } from 'react';
import { TextField, ClickAwayListener, Box, useTheme } from '@mui/material';
import { Search } from '@mui/icons-material';

import { searchUsers } from '../../services/userServices';
import useDebouncing from '../../hooks/useDebouncing';
import User from '../../types/user';
import SearchList from './SearchList';

const SearchInput: React.FC = () => {
  const [value, setValue] = useState('');
  const [isActive, setIsActive] = useState(false);
  const [showList, setShowList] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [width, setWidth] = useState<undefined | number>();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const theme = useTheme();
  const debounce = useDebouncing();

  const handleSearchUsers = async (value: string): Promise<void> => {
    if (!value.trim().length) {
      setUsers([]);
      setError(null);
      return;
    }

    try {
      const response = await searchUsers({ value });

      setError(null);
      setUsers(response.data);
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setValue(e.target.value);
    debounce(500, handleSearchUsers.bind(this, e.target.value));
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
  console.log(users);

  return (
    <>
      <SearchList
        open={isActive}
        showList={showList && !!users.length}
        anchorEl={inputRef.current}
        placement="bottom"
        users={users}
        width={width && width - 16}
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
