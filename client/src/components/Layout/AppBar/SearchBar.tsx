import React, { useState } from 'react';
import { TextField, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  input: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    marginLeft: theme.spacing(2),
    borderRadius: 20,
    height: 40,
    width: '30vw',
    transition: 'width 0.15s ease-out',
    '&:focus-within': {
      width: '50vw',
    },
  },
}));

const SearchBar: React.FC = () => {
  const [value, setValue] = useState('');
  const classes = useStyles();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setValue(e.target.value);
  };

  return (
    <TextField
      color="secondary"
      InputProps={{ className: classes.input }}
      value={value}
      onChange={handleChange}
      placeholder="Search projects..."
      variant="outlined"
    />
  );
};

export default SearchBar;
