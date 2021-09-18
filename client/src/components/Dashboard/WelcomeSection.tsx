import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Box, Typography, Button, Divider, useTheme } from '@material-ui/core';
import { Add } from '@material-ui/icons';

import { RootState } from '../../store/types/state';
import ProjectDialog from '../Project/ProjectDialog';

const WelcomeSection: React.FC = () => {
  const [open, setOpen] = useState(false);
  const username = useSelector((state: RootState) => state.auth.user?.username);
  const theme = useTheme();

  const toggleDialog = (): void => {
    setOpen((isOpen) => !isOpen);
  };

  return (
    <>
      <Box
        position="relative"
        pb={3}
        pt={9}
        display="flex"
        alignItems="center"
        justifyContent="space-between"
      >
        <Box>
          <Typography variant="h5">{`Hello, ${username}`}</Typography>
          <Typography variant="h6" color="textSecondary" fontSize={theme.typography.body1.fontSize}>
            Feeling like creating something new?
          </Typography>
        </Box>
        <Button variant="contained" startIcon={<Add />} onClick={toggleDialog}>
          Create new project
        </Button>
      </Box>
      <ProjectDialog open={open} onClose={toggleDialog} />
    </>
  );
};

export default WelcomeSection;
