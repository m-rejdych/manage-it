import Image from 'next/image';
import { Paper, useTheme } from '@mui/material';

import SearchInput from '../Search/SearchInput';

const Topbar: React.FC = () => {
  const theme = useTheme();

  return (
    <Paper
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        px: 3,
        py: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        boxShadow: 'none',
        borderBottom: `1px solid ${theme.palette.divider}`,
      }}
    >
      <Image src="/Logo.svg" alt="Logo" width={90} height={50} />
      <SearchInput />
    </Paper>
  );
};

export default Topbar;
