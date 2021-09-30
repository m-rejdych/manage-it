import React, { useState } from 'react';
import { TextField, ClickAwayListener, useTheme } from '@mui/material';
import { Search } from '@mui/icons-material';

import { searchUsers } from '../../services/userServices';
import useDebouncing from '../../hooks/useDebouncing';
import User from '../../types/user';

const SearchInput: React.FC = () => {
  const [value, setValue] = useState('');
  const [isActive, setIsActive] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<string | null>(null);
  const theme = useTheme();
  const debounce = useDebouncing();

  const handleSearchUsers = async (): Promise<void> => {
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
    debounce(1000, handleSearchUsers);
  };

  return (
    <ClickAwayListener onClickAway={(): void => setIsActive(false)}>
      <TextField
        placeholder="Search..."
        value={value}
        size="small"
        onChange={handleChange}
        onClick={(): void => setIsActive(true)}
        helperText={error || ''}
        error={!!error}
        InputProps={{
          startAdornment: <Search color="disabled" />,
          sx: { boxShadow: isActive ? theme.shadows[6] : 'none', borderRadius: 3 },
        }}
        sx={{ width: isActive ? '40%' : '30%', transition: 'all 0.2s ease' }}
      />
    </ClickAwayListener>
  );
};

export default SearchInput;
