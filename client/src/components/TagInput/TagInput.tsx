import React, { useState } from 'react';
import { OutlinedTextFieldProps, Box, TextField, Typography, useTheme } from '@material-ui/core';

import Tag from './Tag';

interface Props extends Partial<OutlinedTextFieldProps> {
  tags?: string[];
  onTagChange: (tags: string[]) => void;
}

const TagInput: React.FC<Props> = ({ tags = [], onTagChange, fullWidth, InputProps, ...rest }) => {
  const [value, setValue] = useState('');
  const [currentTags, setCurrentTags] = useState(tags);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (e.target.value === ' ') return;

    const tagValue = e.target.value.split(' ');

    if (tagValue.length === 1) {
      setValue(tagValue[0]);
      return;
    }

    const newTags = currentTags.includes(tagValue[0].toLowerCase())
      ? currentTags
      : [...currentTags, tagValue[0].toLowerCase()];

    if (currentTags.length === newTags.length) {
      setValue('');
      return;
    }

    setCurrentTags(newTags);
    onTagChange(newTags);
    setValue('');
  };

  const handleDelete = (name: string) => {
    const newTags = currentTags.filter((tag) => tag !== name);
    setCurrentTags(newTags);
    onTagChange(newTags);
  };

  return (
    <Box width={fullWidth ? '100%' : 'auto'}>
      <TextField
        {...rest}
        helperText=""
        fullWidth={fullWidth}
        value={value}
        onChange={handleChange}
      />
      <Box display="flex" flexWrap="wrap" alignItems="center">
        {currentTags.length ? (
          <Typography variant="caption" sx={{ fontWeight: 700, pl: 1 }}>
            Tags:
          </Typography>
        ) : null}
        {currentTags.map((name) => (
          <Tag
            key={`project-form-tag-${name}`}
            name={name}
            onDelete={(): void => handleDelete(name)}
          />
        ))}
      </Box>
    </Box>
  );
};

export default TagInput;
