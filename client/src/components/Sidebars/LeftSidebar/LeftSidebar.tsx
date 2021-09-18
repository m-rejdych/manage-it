import Image from 'next/image';
import { Paper } from '@material-ui/core';

import Nav from '../../Nav';

const LeftSidebar: React.FC = () => {
  return (
    <Paper
      sx={{
        minHeight: '100vh',
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
