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
        borderRadius: '0 5px 5px 0',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        pt: theme.spacing(4),
      }}
    >
      <Image src="/Logo.svg" alt="Logo" width={56} height={40} />
      <Nav />
      <BottomButtons />
    </Paper>
  );
};

export default Sidebar;
