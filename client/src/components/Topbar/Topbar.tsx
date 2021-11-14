import Image from 'next/image';
import { Paper, useTheme } from '@mui/material';
import { useRouter } from 'next/router';

import SearchInput from '../Search/SearchInput';
import SearchItem from '../Search/types/SearchItem';
import SEARCH_ITEM_TYPES from '../Search/constants/searchItemTypes';
import ROUTES from '../../constants/routes';

const Topbar: React.FC = () => {
  const theme = useTheme();
  const router = useRouter();

  const handleSelect = (item: SearchItem | null): void => {
    if (!item) return;
    const { id, type } = item;

    switch (type) {
      case SEARCH_ITEM_TYPES.PROJECT:
        router.push(`${ROUTES.PROJECTS}/${id}`);
        break;
      default:
        console.log(type, id);
    }
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
        search={[SEARCH_ITEM_TYPES.USER, SEARCH_ITEM_TYPES.PROJECT]}
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
