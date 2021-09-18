import Image from 'next/image';
import { Paper, useTheme } from '@mui/material';

import Nav from '../../Nav';

const LeftSidebar: React.FC = () => {
  const theme = useTheme();

  return (
    <Paper
      sx={{
        position: 'fixed',
        left: 0,
        top: 0,
        height: '100vh',
        width: `calc(25vw - ${theme.spacing(3)})`,
        borderRadius: '0 50px 0 0',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Image src="/Logo.svg" alt="Logo" width={150} height={150} />
      <Nav />
    </Paper>
  );
};

export default LeftSidebar;
