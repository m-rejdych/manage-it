import React, { useState } from 'react';
import { ListItem, ListItemText, ListItemIcon, Checkbox, IconButton, Slide } from '@mui/material';
import { Delete } from '@mui/icons-material';

interface Props {
  value: string;
  onDelete: (deleteValue: string) => void;
  containerRef: React.MutableRefObject<HTMLDivElement | null>;
}

const CheckpointListItem: React.FC<Props> = ({ value, onDelete, containerRef }) => {
  const [isShown, setIsShown] = useState(true);

  return (
    <Slide in={isShown} container={containerRef?.current} onExited={(): void => onDelete(value)}>
      <ListItem divider>
        <ListItemIcon>
          <Checkbox size="small" disabled />
        </ListItemIcon>
        <ListItemText
          primaryTypographyProps={{
            color: 'textSecondary',
            sx: { overflow: 'hidden', textOverflow: 'ellipsis' },
          }}
        >
          {value}
        </ListItemText>
        <ListItemIcon>
          <IconButton size="small" onClick={(): void => setIsShown(false)}>
            <Delete fontSize="small" color="error" />
          </IconButton>
        </ListItemIcon>
      </ListItem>
    </Slide>
  );
};

export default CheckpointListItem;
