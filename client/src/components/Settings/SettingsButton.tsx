import { useState, useRef, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Button, Box, useTheme } from '@material-ui/core';
import { ExpandMore, AccountCircle } from '@material-ui/icons';

import { RootState } from '../../store/types/state';
import SettingsDropdown from './SettingsDropdown';

const Settings: React.FC = () => {
  const [open, setOpen] = useState(false);
  const username = useSelector((state: RootState) => state.auth.user?.username);
  const iconRef = useRef<SVGSVGElement | null>(null);
  const initRef = useRef<boolean | null>(false);
  const theme = useTheme();

  const rotateIcon = useCallback((): void => {
    if (!iconRef.current) return;

    iconRef.current.animate(
      [
        { transform: `rotateZ(${open ? '0' : '180deg'})` },
        { transform: `rotateZ(${open ? '180deg' : '0'})` },
      ],
      {
        duration: 300,
        easing: 'ease-out',
        fill: 'forwards',
      }
    );
  }, [open]);

  useEffect(() => {
    if (!initRef.current) {
      initRef.current = true;
      return;
    }

    rotateIcon();
  }, [rotateIcon]);

  const toggleDropdown = (): void => {
    setOpen((prev) => !prev);
  };

  return (
    <Box position="relative">
      <Button
        onClick={toggleDropdown}
        startIcon={<AccountCircle />}
        endIcon={<ExpandMore sx={{ transformOrigin: 'center' }} ref={iconRef} />}
        sx={{
          color: theme.palette.action.active,
        }}
      >
        {username}
      </Button>
      <SettingsDropdown open={open} onClose={(): void => setOpen(false)} />
    </Box>
  );
};

export default Settings;
