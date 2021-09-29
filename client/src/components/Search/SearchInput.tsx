import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { TextField, ClickAwayListener, useTheme } from '@mui/material';
import { Search } from '@mui/icons-material';

import { searchUsers } from '../../store/ducks/search/actions';

const SearchInput: React.FC = () => {
  const [value, setValue] = useState('');
  const [isActive, setIsActive] = useState(false);
  const theme = useTheme();
  const dispatch = useDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setValue(e.target.value);
    dispatch(searchUsers({ value: e.target.value }));
  };

  return (
    <ClickAwayListener onClickAway={(): void => setIsActive(false)}>
      <TextField
        placeholder="Search..."
        value={value}
        size="small"
        onChange={handleChange}
        onClick={(): void => setIsActive(true)}
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
