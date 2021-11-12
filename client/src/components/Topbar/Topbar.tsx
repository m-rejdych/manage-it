import Image from 'next/image';
import { Paper, useTheme } from '@mui/material';

import SearchInput from '../Search/SearchInput';
import SearchItem from '../Search/types/SearchItem';

const Topbar: React.FC = () => {
  const theme = useTheme();

  const handleSelect = (item: SearchItem): void => {
    console.log(item);
  };

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
      <SearchInput
        onSelect={handleSelect}
        size="small"
        placeholder="Search..."
        useActiveState
        withIcon
      />
    </Paper>
  );
};

export default Topbar;
