import React, { useState } from 'react';
import { TextField, useTheme } from '@material-ui/core';
import { Search } from '@material-ui/icons';

const SearchInput: React.FC = () => {
  const [value, setValue] = useState('');
  const theme = useTheme();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setValue(e.target.value);
  };

  return (
    <TextField
      fullWidth
      placeholder="Search..."
      value={value}
      onChange={handleChange}
      InputProps={{
        startAdornment: <Search color="disabled" />,
        sx: { boxShadow: theme.shadows[10], borderRadius: 5 },
      }}
    />
  );
};

export default SearchInput;
