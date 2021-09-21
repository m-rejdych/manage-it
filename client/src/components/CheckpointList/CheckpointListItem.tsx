import React, { useState } from 'react';
import {
  ListItem,
  ListItemText,
  ListItemIcon,
  Checkbox,
  IconButton,
  Slide,
  useTheme,
} from '@mui/material';
import { Delete } from '@mui/icons-material';

interface Props {
  value: string;
  onDelete: (deleteValue: string) => void;
  containerRef: React.MutableRefObject<HTMLDivElement | null>;
}

const CheckpointListItem: React.FC<Props> = ({ value, onDelete, containerRef }) => {
  const [isShown, setIsShown] = useState(true);
  const theme = useTheme();

  return (
    <Slide in={isShown} container={containerRef?.current} onExited={(): void => onDelete(value)}>
      <ListItem
        sx={{
          position: 'relative',
          '::after': {
            content: '""',
            position: 'absolute',
            height: '1px',
            backgroundColor: theme.palette.divider,
            width: theme.spacing(2),
            left: 0,
            top: '50%',
            transform: 'translateY(-50%)',
          },
          '::before': {
            content: '""',
            position: 'absolute',
            backgroundColor: theme.palette.divider,
            top: 0,
            bottom: 0,
            width: '1px',
            left: 0,
          },
          ':first-child::before': {
            top: '50%',
          },
          ':last-child::before': {
            bottom: '50%',
          },
        }}
      >
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
