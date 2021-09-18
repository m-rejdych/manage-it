import React, { useState } from 'react';
import {
  TextField,
  Box,
  IconButton,
  Slide,
  Typography,
  ClickAwayListener,
  useTheme,
} from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';

const Search: React.FC = () => {
  const [value, setValue] = useState('');
  const [showInput, setShowInput] = useState(false);
  const theme = useTheme();

  const toggleInput = (): void => {
    setShowInput((prev) => !prev);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setValue(e.target.value);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key !== 'Enter' || !showInput) return;

    setShowInput(false);
  };

  return (
    <ClickAwayListener onClickAway={(): void => setShowInput(false)}>
      <Box position="relative" overflow="hidden">
        <Slide in={showInput} direction="left">
          <TextField
            onChange={handleChange}
            onKeyPress={handleKeyPress}
            placeholder="Search..."
            inputProps={{
              sx: {
                padding: theme.spacing(1.0625, 1.75),
                paddingRight: theme.spacing(6),
                width: 300,
              },
            }}
          />
        </Slide>
        {!!value.trim() && !showInput && (
          <Typography
            color="textSecondary"
            sx={{
              position: 'absolute',
              top: '50%',
              transform: 'translateY(-50%)',
              right: theme.spacing(6),
              paddingLeft: theme.spacing(1.75),
              width: '100%',
              overflow: 'hidden',
              whiteSpace: 'nowrap',
              textOverflow: 'ellipsis',
              textAlign: 'right',
            }}
          >
            {value}
          </Typography>
        )}
        <IconButton
          onClick={toggleInput}
          sx={{
            position: 'absolute',
            right: theme.spacing(1),
            top: '50%',
            transform: 'translateY(-50%)',
          }}
        >
          <SearchIcon />
        </IconButton>
      </Box>
    </ClickAwayListener>
  );
};

export default Search;
