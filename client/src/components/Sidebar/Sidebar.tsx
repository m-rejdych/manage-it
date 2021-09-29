import Image from 'next/image';
import { Paper, useTheme } from '@mui/material';

import Nav from '../Nav';
import BottomButtons from './BottomButtons';

const Sidebar: React.FC = () => {
  const theme = useTheme();

  return (
    <Paper
      sx={{
        position: 'fixed',
        left: 0,
        top: 0,
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        pb: theme.spacing(4),
        pt: theme.spacing(9),
        boxShadow: 'none',
        borderRight: `1px solid ${theme.palette.divider}`,
      }}
    >
      <Nav />
      <BottomButtons />
    </Paper>
  );
};

export default Sidebar;
